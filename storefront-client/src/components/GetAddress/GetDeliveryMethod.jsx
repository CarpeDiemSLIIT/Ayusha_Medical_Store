import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "../customMUI/FlexBetween";

export default function GetDeliveryMethod({
  setShippingMethod,
  setShippingCost,
}) {
  const [selectedM, setSelectedM] = useState("DHL");
  const handleClick = (method) => (e) => {
    setSelectedM(method);
  };
  const { palette } = useTheme();

  useEffect(() => {
    if (selectedM === "DHL") {
      setShippingMethod("DHL normal");
      setShippingCost(2);
    }
    if (selectedM === "DHLF") {
      setShippingMethod("DHL fast");
      setShippingCost(4);
    }
  }, [selectedM]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="0.5rem"
      padding="1rem"
      sx={{
        border: 1,
        borderRadius: "0.5rem",
        borderColor: "grey.400",
      }}
    >
      <Typography variant="h4" color="initial">
        Select Delivery Method
      </Typography>
      <Card
        sx={
          "DHL" === selectedM
            ? {
                border: `1px solid ${palette.primary.main}`,
                background: palette.primary.light,
              }
            : null
        }
      >
        <CardActionArea onClick={handleClick("DHL")}>
          <CardContent>
            <FlexBetween>
              <Typography>DHL normal (within 7days)</Typography>
              <Typography>$ 2</Typography>
            </FlexBetween>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        sx={
          "DHLF" === selectedM
            ? {
                border: `1px solid ${palette.primary.main}`,
                background: palette.primary.light,
              }
            : null
        }
      >
        <CardActionArea onClick={handleClick("DHLF")}>
          <CardContent>
            <FlexBetween>
              <Typography>DHL fast delivery (Within 2days) </Typography>
              <Typography>$ 4</Typography>
            </FlexBetween>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
