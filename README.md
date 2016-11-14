
/** install node,git on Linux **/
sudo apt-get install curl
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs
sudo npm update
sudo apt-get install git 


/** install node,git on windows */
download and setup node https://nodejs.org/download/
download and setup git https://msysgit.github.io/

/** for Debug **/
sudo npm install -g grunt-cli
sudo npm install -g grunt
sudo npm install -g bower 

sudo mkdir apps
cd apps
sudo chown -R $(whoami) ~/.npm ///for linux
git clone http://{{user}}@gitrepo.nextsphere.com:7990/scm/fg/fgr.git

cd fgr
git checkout dev
sudo npm install
bower install

sudo npm start

