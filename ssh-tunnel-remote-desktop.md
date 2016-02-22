HOW TO DO A REMOTE DESKTOP TO RPi WITH SSH TUNNEL
=================================================

[on rpi]
    sudo apt-get install xrdp
    sudo /etc/init.d/xrdp start #if not already
    #sudo nano /etc/xrdp/xrdp.ini #don't need this

This opens up port 3389.

Let's say the firewall is only open on SSH, though.

[on local]
    ssh -L 8080:localhost:3389 rpi

Now we can Remote Desktop Connection to localhost:8080, 
and it'll go to RPi:3389.

Done!
