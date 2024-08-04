"use client"
import { Box, Typography, AppBar, Modal, Toolbar, IconButton, Button, Card, Chip, Stack, Divider, FormControl, InputLabel, Select, MenuItem, TextField} from '@mui/material';
import { useEffect, useState } from 'react';
import {fetchPantryItems, addPantryItem, updatePantryItemQuantity } from "../../services/firebaseService";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  };

export default function Pantry() {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [newItems, setNewItems] = useState([{ itemName: '', quantity: '', itemType: '', expiryDate: '' }]);
    const [error, setError] = useState('');

    const [filterType, setFilterType] = useState('name');
    const [filterValue, setFilterValue] = useState('');
  
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setNewItems([{ itemName: '', quantity: '', itemType: '', expiryDate: '' }]);
        setError('');
        setOpen(false);
      };

    {/* Function to update and retrieve the Pantry list  */}
    const updatePantry = async () => {
        const pantryItems = await fetchPantryItems();
        setItems(pantryItems);
      };

    useEffect(() => {
        updatePantry()
    }, [])

    const handleInputChange = (index, field, value) => {
        const updatedItems = [...newItems];
        updatedItems[index][field] = field === 'quantity' ? parseInt(value.replace(/\D/g, ''), 10) : value;
        setNewItems(updatedItems);
      };
    
    const addInputField = () => {
        setNewItems([...newItems, { itemName: '', quantity: '', itemType: '', expiryDate: '' }]);
    };
    
    const removeInputField = (index) => {
        const updatedItems = newItems.filter((_, i) => i !== index);
        setNewItems(updatedItems);
    };
    
    const addItem = async () => {
        try {
            for (const item of newItems) {
              if (!item.itemName || !item.quantity || !item.itemType || !item.expiryDate) {
                setError('All fields are required.');
                return;
              }
              console.log('Adding item:', item);
              await addPantryItem(item);
            }
            await updatePantry();
            handleClose();
          } 
        catch (error) {
            setError('Error adding item: ', error);
        }
    };

    const incrementQuantity = async (id, currentQuantity) => {
        const newQuantity = currentQuantity + 1;
        await updatePantryItemQuantity(id, newQuantity);
        updatePantry();
      };
    
      const decrementQuantity = async (id, currentQuantity) => {
        if (currentQuantity > 0) {
          const newQuantity = currentQuantity - 1;
          await updatePantryItemQuantity(id, newQuantity);
          updatePantry();
        }

      };

    const applyFilter = (item) => {
        switch (filterType) {
            case 'name':
                return item.itemName.toLowerCase().includes(filterValue.toLowerCase());
            case 'type':
                return item.itemType.toLowerCase().includes(filterValue.toLowerCase());
            case 'date':
                return item.expiryDate === filterValue;
            case 'month':
                return new Date(item.expiryDate).getMonth() + 1 === parseInt(filterValue);
            case 'year':
                return new Date(item.expiryDate).getFullYear() === parseInt(filterValue);
            default:
                return true;
        }
    };
        
    const filteredPantry = items.filter(applyFilter);        
    
  return (
    <Box 
      width={"100vw"} height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      flexDirection={'column'}
      alignItems={"center"}
      bgcolor={' #f9f5c8 '}
    >
      {/* Navbar */}
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pantry Tracker System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    {/* Filter Section */}
    <Box width="100%" height="40px" sx={{ margin: '20px' }}  bgcolor={'#8A2BE2'}
        display={"flex"}
        justifyContent={"left"}
        alignItems={"center"}
        padding={5}
    >
        <Typography color="#000000" variant="h5">
          Search/Filter Item
        </Typography>
        <FormControl variant="outlined" sx={{ minWidth: 120, marginLeft: "50px" }}>
            <InputLabel id="filter-type-label">Filter By</InputLabel>
            <Select
              labelId="filter-type-label"
              id="filter-type"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter By"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="type">Type</MenuItem>
              <MenuItem value="date">Expiry Date</MenuItem>
              <MenuItem value="month">Expiry Month</MenuItem>
              <MenuItem value="year">Expiry Year</MenuItem>
            </Select>
          </FormControl>
          <TextField
            id="filter-value"
            label="Filter Value"
            variant="outlined"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            type={filterType === 'date' ? 'date' : 'text'}
            InputLabelProps={filterType === 'date' ? { shrink: true } : {}}
          />
        </Box>


    <Box display="flex"
      flexDirection="column"
      alignItems="left"
      flexGrow={500}
      border={'1px solid #333'}
      sx={{ width: '100%', padding: '10px', textAlign: 'left' }}>
    <Box>
        <Typography color="#000000" variant="h4">
          Items in Pantry
        </Typography>
        <Divider />
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          overflow="auto"
          maxHeight="500px"
          sx={{ width: '100%', padding: '10px', textAlign: 'left' }}
        >
        {filteredPantry.map((item) => (
            <Card key={item.id} variant="outlined" sx={{ minWidth: 360, maxWidth: 460, margin:"5px"}}>
            <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography gutterBottom variant="h5" component="div">
                {item.itemName}
              </Typography>
              <Box display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                    <Typography gutterBottom variant="body1" component="div">
                        Count:
                    </Typography>
                    <IconButton onClick={() => incrementQuantity(item.id, item.quantity)}>
                            <AddIcon />
                    </IconButton>
                    <Typography gutterBottom variant="body1" component="div">
                        {item.quantity}
                    </Typography>
                    <IconButton onClick={() => decrementQuantity(item.id, item.quantity)}>
                            <RemoveIcon />
                    </IconButton>
                </Box>
            </Stack>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography gutterBottom variant="body2">
                Type: {item.itemType}
              </Typography>
              <Typography gutterBottom variant="body2">
                Expiry Date: {item.expiryDate}
              </Typography>
            </Box>
          </Box>
            </Card>
        ))}
        </Box>
    </Box>
    </Box>
    
    {/* Displaying the Add button */}
    <Button variant='contained' sx={{ margin: 3 }} onClick={handleOpen}>Add items</Button>
    {/* Creating a Modal to open up when Add items button is clicked */}
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add items
          </Typography>
          {newItems.map((item, index) => (
            <Stack key={index} width={"100%"} height={'50px'} direction={'row'} spacing={2}>
              <TextField
                id='outlined-basic'
                label='Item'
                variant="outlined"
                fullWidth
                value={item.itemName}
                onChange={(e) => handleInputChange(index, 'itemName', e.target.value)}
              />
              <TextField
                id='outlined-basic'
                label='Quantity'
                variant="outlined"
                fullWidth
                value={item.quantity}
                onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
              />
              <TextField
                id='outlined-basic'
                label='Type'
                variant="outlined"
                fullWidth
                value={item.itemType}
                onChange={(e) => handleInputChange(index, 'itemType', e.target.value)}
              />
              <TextField
                id='date'
                label='Expiry Date'
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                value={item.expiryDate}
                onChange={(e) => handleInputChange(index, 'expiryDate', e.target.value)}
              />
              <IconButton aria-label="delete" onClick={() => removeInputField(index)}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          {error && <Typography color="error">{error}</Typography>}
          <Stack width={"100%"} height={'50px'} direction={'row'} spacing={2}>
            <Button variant='outlined' fullWidth onClick={addInputField}>Add More Items</Button>
            <Button variant='outlined' fullWidth onClick={addItem}>Update Pantry</Button>
          </Stack>
        </Box>
      </Modal>


    </Box>
  );
} 