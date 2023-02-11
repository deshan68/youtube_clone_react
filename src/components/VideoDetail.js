import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckBox, CheckCircle } from "@mui/icons-material";
import { fetchFromAPI } from "../utilis/FetchFromAPI";
import Videos from "./Videos";
import { demoChannelUrl } from "../utilis/constants";

export default function VideoDetail() {
  const { id } = useParams();
  const [videoDetail, setVideoDetails] = useState(null);
  const [videos, setVideos] = useState(null);
  console.log(`https://www.youtube.com/watch?v=${id}`);
  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetails(data.items[0]);
    });
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => {
        setVideos(data.items);
      }
    );
  }, [id]);

  if (!videoDetail?.snippet) return "Loading...";

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail; // object de-structuring

  return (
    <Box minHeight={"95vh"}>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "", top: "86px" }}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className={"react-player"}
              controls
            />
            <Typography
              color={"#fff"}
              variant="h5"
              fontWeight={"bold"}
              sx={{ paddingLeft: "15px", paddingTop: "10px" }}
            >
              {title}
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: "subtitle1", md: "h5" }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack
                direction={"row"}
                gap={"20px"}
                alignItems="center"
                justifyContent={"center"}
              >
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: "0.7" }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px="12px" py={{ md: 1, xs: 1 }}>
          <Videos videos={videos} direction={"column"} />
        </Box>
      </Stack>
    </Box>
  );
}
