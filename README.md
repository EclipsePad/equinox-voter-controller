### Project Description

***equinox-voter-controller*** is a script running Express.js server to send `PushByAdmin` msg to voter contract every minute and make a snapshot via [capture-voters](https://github.com/EclipsePad/eclipse-contracts-core/blob/main/scripts/src/workflow/capture-voters.ts) script at the end of each epoch


### Initial Settings (for Ubuntu 22.04)

1) Install required system updates and components
```
sudo apt update && sudo apt -y upgrade
sudo apt-get install nano
sudo apt-get install -y curl
sudo apt-get install git
```

2) Install and check Node.js 20, yarn
```
curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
sudo -E bash nodesource_setup.sh
sudo apt-get install -y nodejs
node -v

npm install --global yarn
yarn -v
```

3) Clone the project repositiry and install dependencies

```
git clone https://github.com/EclipsePad/equinox-voter-controller.git
cd equinox-voter-controller
yarn
```

4) Create env file and specify seed phrase for account sending messages to voter contract

```
touch config.env
chmod 600 ./config.env
nano ./config.env
```

Enter (without braces)

```
PORT=<PORT_NUMBER>
SEED="<your seed phrase>"
```

Save the file (Ctrl+X, then Y, then Enter)

5) Replenish the account balance with several amount of NTRN

6) Specify the account address in address config of the voter contract

```
{
  "update_address_config": {
    "controller": "<address>"
  }
}
```

### Usage

Run the server

```
yarn run start
```

## REST API

Base URL is `http://<server_ip>:<port>/api`

GET requests:
`/get-voters` - returns previous epoch [UserListResponseItem[]](https://github.com/EclipsePad/eclipse-contracts-core/blob/main/scripts/src/interfaces/Voter.types.ts#L277)



