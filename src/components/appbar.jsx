import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const FilterButton = styled(Button)(({ theme }) => ({
  variant: "outlined",
  display: { sm: "none", md: "flex" },
  backgroundColor: theme.palette.grey[600],
  padding: "6px 12px",
  color: theme.palette.primary.contrastText,
}));

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,

  swidth: "30%",

  // at sm and up, bump it to 50%
  [theme.breakpoints.up("sm")]: {
    width: "40%",
  },
  "& .MuiInputBase-root": {
    padding: "0 10px",
    color: theme.palette.text.primary,

    "& input::placeholder": {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
}));

function ToolBarComponent({}) {
  return (
    <StyledToolbar>
      <Typography variant="h5" component="div">
        Today in Toronto
      </Typography>
      <SearchField
        variant="outlined"
        size="small"
        placeholder="Search events..."
        sx={{ width: { xs: "30%", sm: "40%" } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 1 }}>
        <FilterButton>
          <Typography variant="body1">Date</Typography>
        </FilterButton>
        <FilterButton>
          <Typography variant="body1">Category</Typography>
        </FilterButton>
      </Box>
    </StyledToolbar>
  );
}

const AppBarComponent = ({
  title = "Today in Toronto",
  //   searchValue,
  //   onSearchChange,
  //   onFilterDate,
  //   onFilterCategory,
}) => {
  return (
    <AppBar
      position="sticky"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "primary.light",
      }}
    >
      <ToolBarComponent />
    </AppBar>
  );
};

export default AppBarComponent;
