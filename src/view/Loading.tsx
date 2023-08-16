import { Box, LinearProgress, Typography, colors } from "@mui/material";
import * as React from "react";

export function Loading(): React.JSX.Element {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing(2),
      })}
    >
      <Typography color={colors.grey[100]} variant="h1">
        Loading...
      </Typography>
      <LinearProgress sx={{ width: "50%" }} variant="indeterminate" />
    </Box>
  );
}
