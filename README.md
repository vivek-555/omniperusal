# omniperusal app

Coded in [React](http://facebook.github.io/react/), [Webpack](http://webpack.github.io/), [Flask](http://flask.pocoo.org/) and [PostgreSQL](http://www.postgresql.org/).

## Local installation

**Prerequisites**:

- Pip (https://pip.pypa.io/en/latest/installing.html)
- PostgreSQL (http://www.postgresql.org/download/)
- NPM (https://docs.npmjs.com/getting-started/installing-node)

Clone repository:

```
git clone git@github.com:vivek-555/omniperusal.git

cd omniperusal/client
```

Install npm dependencies:

```
npm install
```

Setup python environment and install dependencies:

```
cd ../../
virtualenv venv
source venv/bin/activate     # or venv/bin/activate.fish or whatever
cd omniperusal/server
pip install -r requirements.txt
```

Copy `.env.example` config file to `.env`:

```
cp .env.example .env
```

Start PostgreSQL service if needed:

```
pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
```


Finally, start local server for serving single page:

```
npm start

open http://localhost:3000
```

Start drf server:

```
cd server

instructions pending

```