import { Link } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { demoProfilePicture } from "../utilis/constants";
import { Box } from "@mui/system";

export default function ChannelCard({ channelDetail }) {
  return (
    <Box
      sx={{
        boxShadow: "none",
        // borderRadius: "20px",
        width: { md: "320px", xs: "356px" },
        height: "326px",
        border: "#1e1e1e 1px solid",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <Link to={`/channel/${channelDetail?.id?.channelId}`}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <CardMedia
            image={
              channelDetail?.snippet?.thumbnails?.high?.url ||
              demoProfilePicture
            }
            alt={channelDetail?.snippet?.title}
            sx={{ borderRadius: "50%", height: "180px", width: "180px" }}
          />
          <Typography variant="h6">
            {channelDetail?.snippet?.title}
            <CheckCircle sx={{ fontSize: 14, color: "gray", ml: "5px" }} />
          </Typography>
          {channelDetail?.statistics?.subcriberCount && (
            <Typography>
              {parseInt(channelDetail?.statistics?.subcriberCount).toString()}{" "}
              Subcribers
            </Typography>
          )}
        </CardContent>
      </Link>
    </Box>
  );
}
