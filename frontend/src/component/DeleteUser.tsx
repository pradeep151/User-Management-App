import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';

interface Props {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirm = ({ name, onConfirm, onCancel }: Props) => (
  <Dialog open onClose={onCancel}>
    <DialogTitle>Delete User</DialogTitle>
    <DialogContent>
      <DialogContentText>
        ⚠️ Are you sure you want to delete <strong>{name}</strong>?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="error" onClick={onConfirm}>
        Yes, Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteConfirm;
