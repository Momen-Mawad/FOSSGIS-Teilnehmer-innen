from flask import render_template
from flask import Flask

app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"

@app.route('/', methods=['GET'])
def main():

    return render_template('main.html')


if __name__ == "__main__":
    app.secret_key = '123456'
    app.run()
