import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utilis/FetchFromAPI";

export default function ChannelDetail() {
  const [channelDetails, setChannelDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`channels?=snippet&id=${id}`).then((data) => {
      setChannelDetails(data?.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);
  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
            height: "300px",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetails} marginTop={"-110px"} />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
}
