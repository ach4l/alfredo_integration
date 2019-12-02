To Connect Raspberry Pi

- Name your wifi hotspot as rpi_hotspot_23
- The network password is maximus13

The device should automatically connect (See in the hotspot settings)

- ssh to the ip address shown in connected devices (Note : This changes everytime)
- Username - pi, password - raspberry

Voila, you should be able to develop!

To activate virtual environment for backend

$ source cacheon_backend/bin/activate


Great Source for creating a development environment

https://superuser.com/questions/1316300/how-to-sync-a-local-dir-to-server-using-git

Git commands :

git remote add origin https://pi@192.168.137.168
git remote set-url origin pi@192.168.137.168:~/cache_on_backend/sync_pi
git push --set-upstream origin master