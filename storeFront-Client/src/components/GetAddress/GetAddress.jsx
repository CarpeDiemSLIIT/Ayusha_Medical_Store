import { useState, useEffect } from "react";
import NewAddress from "./NewAddress";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../features/address/addressSlice";

export default function GetAddress({ setAddress }) {
  const [newAddressOpen, setNewAddressOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const handleClick = (id) => (e) => {
    setSelectedId(id);
  };

  const cardProps = { selectedId, handleClick };

  const { addresses, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.address
  );

  useEffect(() => {
    const address = addresses.find((address) => address._id === selectedId);
    if (address) setAddress(address);
  }, [selectedId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddress());
    return () => {};
  }, []);
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
        Select Delivery Address
      </Typography>
      {/* {JSON.stringify(addresses)} */}
      {addresses &&
        addresses.map((address) => (
          <MyCard
            key={address._id}
            title={`${address.addressLine}, ${address.city}, ${address.state}, ${address.zip} | ${address.phoneNumber}`}
            id={address._id}
            {...cardProps}
          />
        ))}

      <Button
        onClick={() => {
          setNewAddressOpen((now) => !now);
        }}
      >
        New Address
      </Button>
      {newAddressOpen && <NewAddress setNewAddressOpen={setNewAddressOpen} />}
    </Box>
  );
}

function MyCard({ title, id, selectedId, handleClick }) {
  const { palette } = useTheme();
  return (
    <Card
      sx={
        id === selectedId
          ? {
              border: `1px solid ${palette.primary.main}`,
              background: palette.primary.light,
            }
          : null
      }
    >
      <CardActionArea onClick={handleClick(id)}>
        <CardContent>
          <Typography>{title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
