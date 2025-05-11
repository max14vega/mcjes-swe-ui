import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ManuscriptsAPI } from "../../Client/API";

// Display options for categories
const displayNameOptions = [
  { value: "Case Studies", label: "Case Studies" },
  { value: "Original Research", label: "Original Research" },
  { value: "Literature Review", label: "Literature Review" },
];

// FSM mapping actions to labels
const actionToStateOption = {
  "Assign Referee": { value: "REF_REVIEW", label: "In Review" },
  "Rejected": { value: "REJECTED", label: "Rejected" },
  "Withdrawn": { value: "WITHDRAWN", label: "Withdrawn" },
  "Submit Revisions": { value: "REF_REVIEW", label: "In Review" },
  "Accept": { value: "COPY_EDIT", label: "Copy Edit" },
  "Accept with Revisions": {
    value: "AUTHOR_REVISION",
    label: "Author Revision",
  },
  "Done": { value: "NEXT", label: "Advance to Next Step" },
};

// FSM state-to-actions mapping
const stateToActions = {
  SUBMITTED: ["Assign Referee", "Rejected", "Withdrawn"],
  REF_REVIEW: [
    "Assign Referee",
    "Remove Referee",
    "Submit Revisions",
    "Accept",
    "Accept with Revisions",
    "Rejected",
    "Withdrawn",
  ],
  AUTHOR_REVISION: ["Done", "Withdrawn"],
  EDITOR_REVIEW: ["Accept", "Withdrawn"],
  COPY_EDIT: ["Done", "Withdrawn"],
  AUTHOR_REVIEW: ["Done", "Withdrawn"],
  FORMATTING: ["Done", "Withdrawn"],
  REJECTED: ["Withdrawn"],
  WITHDRAWN: ["Withdrawn"],
  PUBLISHED: ["Withdrawn"],
};
const stateLabelMap = {
  AUTHOR_REVIEW: "Author Review",
  AUTHOR_REVISION: "Author Revision",
  COPY_EDIT: "Copy Edit",
  EDITOR_REVIEW: "Editor Review",
  FORMATTING: "Formatting",
  PUBLISHED: "Published",
  REF_REVIEW: "Referee Review",
  REJECTED: "Rejected",
  SUBMITTED: "Submitted",
  WITHDRAWN: "Withdrawn",
};
const EditManuscript = ({
  open,
  onClose,
  manuscriptData,
  onDelete,
  user,
}) => {
  const isEditor = user?.role === 'ED';
  console.log("EditManuscript loaded with user:", user);
  console.log("Is editor:", isEditor);

  const [form, setForm] = useState({
    manuscript_key: "",
    title: "",
    display_name: "",
    abstract: "",
    text: "",
    author_first_name: "",
    author_last_name: "",
    author_email: "",
    state: "",
  });

  const [availableStates, setAvailableStates] = useState([]);
  const [forceState, setForceState] = useState("");
  const [showOverride, setShowOverride] = useState(false);

  useEffect(() => {
    if (manuscriptData) {
      setForm({
        manuscript_key: manuscriptData.manuscript_key || "",
        title: manuscriptData.title || "",
        display_name: manuscriptData.display_name || "",
        abstract: manuscriptData.abstract || "",
        text: manuscriptData.text || "",
        author_first_name: manuscriptData.author_first_name || "",
        author_last_name: manuscriptData.author_last_name || "",
        author_email: manuscriptData.author_email || "",
        state: manuscriptData.state || "",
      });

      const actions = manuscriptData.current_actions || [];
      const mapped = actions
        .map((action) => actionToStateOption[action])
        .filter(Boolean);
      setAvailableStates(mapped);
    }
  }, [manuscriptData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const requiredFields = [
      "title",
      "display_name",
      "abstract",
      "text",
      "author_first_name",
      "author_last_name",
      "author_email",
    ];
  
    const missingFields = requiredFields.filter(
      (field) => !form[field] || form[field].trim() === ""
    );
  
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields:\n${missingFields.join(", ")}`);
      return;
    }
  
    try {
      const { manuscript_key, state, ...metadata } = form;
  
      // Always update manuscript metadata first
      await ManuscriptsAPI.updateManuscript(manuscript_key, metadata);
  
      // Force override path for editor — EXIT immediately after
      if (isEditor && showOverride && forceState) {
        const forcePayload = {
          state: stateLabelMap[forceState] || forceState, // Convert FSM key to proper label
          current_actions: stateToActions[forceState] || [],
        };
      
        console.log("🔄 Submitting forced editor override payload:", JSON.stringify(forcePayload, null, 2));
      
        await ManuscriptsAPI.updateManuscript(manuscript_key, forcePayload);
        onClose();
        return;
      }
  
      // FSM transition (non-override)
      const selectedAction = Object.keys(actionToStateOption).find(
        (key) => actionToStateOption[key].value === state
      );
  
      if (selectedAction && state !== manuscriptData.state) {
        const payload = {
          ...metadata,
          action: selectedAction,
        };
        console.log("FSM transition payload:", payload);
        await ManuscriptsAPI.updateManuscriptState(manuscript_key, payload);
      }
  
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("There was an error updating this manuscript.");
    }
  };

  const handleDelete = () => {
    if (!form.manuscript_key) return;
    if (window.confirm("Are you sure you want to delete this manuscript?")) {
      onDelete(form.manuscript_key);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Manuscript</DialogTitle>
      <DialogContent>
        <form id="edit-manuscript-form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Display Name"
            name="display_name"
            value={form.display_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            select
            disabled
          >
            {displayNameOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Abstract"
            name="abstract"
            value={form.abstract}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
          <TextField
            label="Text"
            name="text"
            value={form.text}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
            margin="normal"
          />
          <TextField
            label="Author First Name"
            name="author_first_name"
            value={form.author_first_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author Last Name"
            name="author_last_name"
            value={form.author_last_name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author Email"
            name="author_email"
            value={form.author_email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {availableStates.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          {isEditor && (
            <>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Typography variant="subtitle1">Editor Override</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setShowOverride((prev) => !prev)}
                >
                  Editor Move
                </Button>
              </Box>
              {showOverride && (
                <TextField
                  select
                  label="Force New State"
                  value={forceState}
                  onChange={(e) => setForceState(e.target.value)}
                  fullWidth
                  margin="normal"
                >
                  {Object.keys(stateToActions).map((stateKey) => (
                    <MenuItem key={stateKey} value={stateKey}>
                      {stateKey}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </>
          )}
        </form>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-between", px: 3, pb: 2 }}
      >
        <Button color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="edit-manuscript-form"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditManuscript;
