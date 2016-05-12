# Streaming video from RPi

## Serve the stream

    raspivid -o - -t 0 -hf -w 640 -h 360 -fps 25 | cvlc -vvv stream:///dev/stdin --sout '#rtp{sdp=rtsp://:[PORT]/[ROUTE]' :demux=h264

(change other options as needed)

## Connect VLC to the stream

    Media > Network Stream > rtsp://[IP-ADDR]:[PORT]/[ROUTE]

Easy peasy.
