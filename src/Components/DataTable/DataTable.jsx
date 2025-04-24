import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton, 
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DataTable = ({
    data,
    columns,
    onRowClick,
    onDelete,
    onEdit,
    onAdd,
    addButtonLabel,
    searchQuery,
  }) => {
    const filteredData = data.filter((item) => {
      const query = searchQuery && searchQuery.toLowerCase();
      return columns.some((column) => {
        const value = item[column.field];
        return query ? (value !== undefined && value !== null && value.toString().toLowerCase().includes(query)) : true;
      });
    });
  
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.label}</TableCell>
              ))}
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={item.id || index}>
                  {columns.map((column) => (
                    <TableCell key={column.field} sx={{maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      {column.field === 'roles' ? item[column.field]?.join(', ') : item[column.field]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    {onEdit && (
                      <IconButton variant="contained" color="primary" onClick={() => onEdit(item)}>
                        <EditIcon />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton variant="contained" color="error" onClick={() => onDelete(item)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
            <TableRow>
            <TableCell colSpan={columns.length + 1} align="center">
              <Button variant="contained" onClick={onAdd}>
                {addButtonLabel}
              </Button>
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

export default DataTable;