import { useState, useEffect } from "react";
import { User } from "../types/user";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

interface Props {
  user?: User;
  onSave: (user: User) => void;
  onCancel: () => void;
}

const UserForm = ({ user, onSave, onCancel }: Props) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setphone] = useState(user?.phone || "");
  const [dob, setDob] = useState(user?.dob ? user.dob.split("T")[0] : "");

  const [gender, setGender] = useState(user?.gender || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleSubmit = () => {
    const newUser = user
      ? { ...user, name, email, phone, dob, gender, country }
      : { id: Date.now(), name, email, phone, dob, gender, country };
    onSave(newUser);
  };

  useEffect(() => {
    if (user && user.dob) {
      setDob(user.dob.split("T")[0]);
    }
  }, [user]);

  return (
    <Dialog open onClose={onCancel} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Update User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Phone"
          margin="normal"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />

        <TextField
          fullWidth
          label="Date of Birth"
          margin="normal"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Gender</InputLabel>
          <Select
            value={gender}
            label="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Country</InputLabel>
          <Select
            value={country}
            label="Country"
            onChange={(e) => setCountry(e.target.value)}
          >
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Germany">Germany</MenuItem>
            <MenuItem value="Brazil">Brazil</MenuItem>
            <MenuItem value="Japan">Japan</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
