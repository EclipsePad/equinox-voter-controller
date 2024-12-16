### Project Description

***equinox-voter-controller*** is a script running Express.js server to send `PushByAdmin` msg to voter contract every minute and make a snapshot via [capture-voters](https://github.com/EclipsePad/eclipse-contracts-core/blob/main/scripts/src/workflow/capture-voters.ts) script at the end of each epoch


### Settings (Ubuntu 22.04)

1) Connect to server over SSH
```
ssh <username>@<server_ip>
```

2) Install required system updates and components
```
sudo apt update && sudo apt -y upgrade
sudo apt-get install -y curl
sudo apt-get install git
```

3) Install and check Node.js 20, yarn
```
curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
node -v

npm install --global yarn
yarn -v
```

4) Clone the project repositiry and install dependencies

```
git clone https://github.com/EclipsePad/equinox-voter-controller.git
cd equinox-voter-controller && yarn
```

5) Create env file and specify seed phrase for account sending messages to voter contract

```
touch config.env
chmod 600 ./config.env
nano ./config.env
```

Enter actual values (replace placeholders <_>)

```
PORT=<port_number>
SEED="<your_seed_phrase>"
```

Save the file (Ctrl+X, then Y, then Enter)

6) Replenish the account balance with several amount of NTRN

7) Specify the account address in address config of the voter contract

```
{
  "update_address_config": {
    "controller": "<address>"
  }
}
```

8) Enable restarting server on schedule and running script on system start

Create a systemd service file for the application
```
nano /etc/systemd/system/voter.service
```

Add this content (replace placeholders <_>)
```
[Unit]
Description=Equinox Voter Controller
After=network.target

[Service]
Type=simple
User=<username>
WorkingDirectory=<path_to_the_project>
ExecStart=/usr/bin/yarn run start
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service
```
sudo systemctl daemon-reload
sudo systemctl enable voter.service
sudo systemctl start voter.service
```

Open the crontab for root
```
sudo crontab -e
```

Add this line to restart the service every day at 8 pm UTC
```
0 20 * * * /usr/bin/systemctl restart voter.service
```

Verify service status
```
sudo systemctl status voter.service
```

9) Run the server

```
yarn run start
```

Note: to find and kill uncompleted process use
```
sudo lsof -i :<port>
kill -9 <PID>
```


## REST API

Base URL is `http://<server_ip>:<port>/api`

GET requests:
`/get-voters` - returns previous epoch [UserListResponseItem[]](https://github.com/EclipsePad/eclipse-contracts-core/blob/main/scripts/src/interfaces/Voter.types.ts#L277)
