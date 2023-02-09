import { Stack, Box } from "@mui/system";
import { ChannelCard, VideoCard } from "./";

export default function Videos({ videos }) {
  return (
    <Stack direction={"row"} flexWrap="wrap" justifyContent={"start"} gap={2}>
      {videos.map((item, idx) => (
        <Box key={idx}>
          {item.id.videoId && <VideoCard video={item} />}
          {item.id.channelId && (
            <ChannelCard channelDetail={item} border={"#1e1e1e 1px solid"} />
          )}
        </Box>
      ))}
    </Stack>
  );
}
