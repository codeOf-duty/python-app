from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import docx
import re
import snippets
import bloom
import os
import random
import hashlib
import bloom
import bloom_test as bf
import file_path as fp
import report_generator as rg
import json_merger as jm
#import freq_counter as fc
import symspell_merger as sm
import files2freq as fg
import file2preprocessor as wg
from pathlib import Path

if Path("datasets/Symspell_Dataset.txt").is_file():
    os.remove("datasets/Symspell_Dataset.txt")

if Path("datasets/Bloom_Dataset.json").is_file():
    os.remove("datasets/Bloom_Dataset.json")

if Path("datasets/docxDataset/status.sts").is_file():
    os.remove("datasets/docxDataset/status.sts")

if Path("datasets/docxDataset-freq/status.sts").is_file():
    os.remove("datasets/docxDataset-freq/status.sts")

app = Flask(__name__)

app.secret_key = os.urandom(24)
app.config['MYSQL_HOST'] = 'sql6.freesqldatabase.com'
app.config['MYSQL_USER'] = 'sql6521260'
app.config['MYSQL_PASSWORD'] = '7wQv8H839F'
app.config['MYSQL_DB'] = 'spt'

mysql = MySQL(app)


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/home')
def home():
    return render_template('index.html')


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        projectpath = request.files['fileinput']
        name = projectpath.filename
        extension = name.split(".")[-1]
        data = []
        if extension == "docx":
            data = snippets.DocxToData(projectpath)
            processed_data = snippets.DocxToList(projectpath)
            wrong_list = bloom.start_bloom(processed_data, 100, 0.5)
            id_set = snippets.ListToDict(wrong_list)
            data = snippets.tagAdder(data, id_set)
        elif extension == "txt":
            data = projectpath.read()
            processed_data = data.decode('utf-8').split()
            wrong_list = bloom.start_bloom(processed_data, 100, 0.5)
            id_set = snippets.ListToDict(wrong_list)
            data = snippets.tagAdder(data.decode('utf-8'), id_set)
        elif extension == "doc":
            return redirect(url_for('home'))
        return render_template('processed.html', value=data.lstrip()+" ")
    else:
        return redirect(url_for('home'))


@app.route('/uploadText', methods=['POST', 'GET'])
def uploadText():
    return render_template('processed.html', value=" ")
    """
    if request.method == 'POST':
        data = request.form['formtextarea'] 
        # data = projectpath.read()
        # print(type(data))
        # print(data)
        processed_data = data.strip().split();
        wrong_list = bloom.start_bloom(processed_data,100,0.5)
        id_set = snippets.ListToDict(wrong_list)
        data = snippets.tagAdder(data,id_set)
        return render_template('processed.html',value = data.lstrip()+" ")
    else:
        return redirect(url_for('home'))
    """


@app.route('/reuploadText', methods=['POST'])
def reuploadText():
    if request.method == 'POST':
        data = request.form['hide-panel']
        print(data)
        import re
        dct_ = []
        for i in re.findall(r'(?<=x).*?(?=Add)', data):
            dct_.append("x"+i+"Add ")
        for i in dct_:
            data = data.replace(i, '')
        data = data.replace(
            ' Add to DictionarySuggestionReplace AllIgnore"  >', " ")
        for i in ['<span ', '>Add ', 'Add   "', '>>', ' " ', 'to DictionaryReplace AllIgnore"  >', 'Add  to DictionaryReplace AllIgnore"', 'AllIgnore"', 'DictionaryReplace', 'Add  "  >>', 'title="">', 'class="', 'id="underline"', 'rel="popover"', 'data-toggle="popover"', 'data-trigger="focus"', 'data-html="true"', 'data-placement="bottom"', 'data-toggle=collapse', 'data-content="', 'data-original-title=""', 'All', 'aria-describedby="', 'href=#suggestionOne', 'title=""', 'class=A2D', 'class=RW', 'class=IW', 'Suggestion', 'class=SW', '<p ', 'class=closePop', 'x', '</p>', 'to', 'Dictionary', 'id=', 'Replace All', 'Add to Dictionary', '</p>', '">', '<hr/>', 'Ignore', '</span>']:
            data = data.replace(i, "")
        """
        for i in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ":
            data = data.replace(i,"")
        """
        processed_data = data.rstrip().split()
        wrong_list = bloom.start_bloom(processed_data, 100, 0.5)
        id_set = snippets.ListToDict(wrong_list)
        data = snippets.tagAdder(data, id_set)
        # print(data)
        return render_template('processed.html', value=data.lstrip()+"<br />")
    else:
        return redirect(url_for('home'))


@app.route('/addUserword', methods=['POST'])
def addUserword():
    word = request.json['data']
    import string
    for c in string.punctuation:
        word = word.replace(c, "")
    for i in ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"]:
        word = word.replace(i, "")
    PATH = fp.userWordFile
    id_ = hashlib.md5(word.encode('utf-8')).hexdigest()[:6]
    with open(PATH, "a", encoding="utf8") as outfile:
        outfile.write("{}->{}\n".format(word, id_))
    return ""


@app.route('/searchWord', methods=['POST'])
def searchWord():
    word = request.json['data']
    suggestion = snippets.suggestionReturner(word)
    # return jsonify({"Data": suggestion})
    print(suggestion)
    return jsonify(str(suggestion).split(":")[0])


@app.route('/admin/login')
@app.route('/admin', methods=['GET', 'POST'])
def login():
    msg = ''
    if 'loggedin' in session and session['loggedin'] == True:
        msg = 'Logged in successfully !'
        return render_template('admin-index.html', msg=msg)
    else:
        if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
            username = request.form['username']
            password = request.form['password']
            print(hashlib.md5(password.encode('utf-8')).hexdigest())
            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
            cursor.execute(
                'SELECT * FROM admin WHERE username = % s AND password = % s', (username, password, ))
            account = cursor.fetchone()
            if account:
                session['loggedin'] = True
                session['id'] = account['id']
                session['username'] = account['username']
                msg = 'Logged in successfully !'
                return render_template('admin-index.html', msg=msg, name=session['username'])
            else:
                msg = 'Incorrect username / password !'
        return render_template('login.html', msg=msg, name="username")


@app.route('/admin/logout')
def logout():
    if 'loggedin' in session and session['loggedin'] == True:
        session.pop('loggedin', None)
        session.pop('id', None)
        session.pop('username', None)
        return redirect(url_for('login'))
    else:
        return redirect(url_for('login'))


@app.route('/localwords')
def localwords():
    if 'loggedin' in session and session['loggedin'] == True:
        f = open(fp.userWordFile, mode='r', encoding='utf-8')
        cont = f.read()
        word = []
        for i in cont.split():
            word.append(i.split("->")[0])
        word = [i for i in word if len(i) > 1]
        word = set(word)
        # print(word)
        return "--".join(map(str, word))
    else:
        return redirect(url_for('login'))


@app.route('/resetwords')
def resetwords():
    if 'loggedin' in session and session['loggedin'] == True:
        f = open(fp.userWordFile, mode='w', encoding='utf-8')
        f.truncate(0)
        f.close()
        return "True"
    else:
        return redirect(url_for('login'))


@app.route('/reportGen')
def reportGen():
    if 'loggedin' in session and session['loggedin'] == True:
        return jsonify(rg.report_gen())
    else:
        return redirect(url_for('login'))


@app.route('/bloomSetter')
def bloomSetter():
    if 'loggedin' in session and session['loggedin'] == True:
        jm.merger()
        return "Done"
    else:
        return redirect(url_for('login'))


@app.route('/bloomGetter')
def bloomGetter():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/Bloom_Dataset.json")
        if(not path.is_file()):
            return "Done"
    else:
        return redirect(url_for('login'))


@app.route('/bloomStop')
def bloomStop():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/Bloom_Dataset.json")
        if(path.is_file()):
            os.remove("datasets/Bloom_Dataset.json")
            return "Done"
    else:
        return redirect(url_for('login'))


@app.route('/symspellStop')
def symspellStop():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/Symspell_Dataset.txt")
        if(path.is_file()):
            os.remove("datasets/Symspell_Dataset.txt")
            return "Done"
        else:
            return "None"
    else:
        return redirect(url_for('login'))


@app.route('/BloomDatasetList')
def BloomDatasetList():
    if 'loggedin' in session and session['loggedin'] == True:
        return str(len(os.listdir("datasets/newUpdates/"))-1)
    else:
        return redirect(url_for('login'))


@app.route('/SymspellDatasetList')
def SymspellDatasetList():
    if 'loggedin' in session and session['loggedin'] == True:
        return str(len(os.listdir("datasets/newUpdates-freq/"))-1)
    else:
        return redirect(url_for('login'))


@app.route('/FreqDatasetList')
def FreqDatasetList():
    if 'loggedin' in session and session['loggedin'] == True:
        return str(len(os.listdir("datasets/docxDataset-freq/"))-1)
    else:
        return redirect(url_for('login'))


@app.route('/WordDatasetList')
def WordDatasetList():
    if 'loggedin' in session and session['loggedin'] == True:
        return str(len(os.listdir("datasets/docxDataset/"))-1)
    else:
        return redirect(url_for('login'))


@app.route('/wordProCheck')
def wordProCheck():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/docxDataset/status.sts")
        if(path.is_file()):
            return "Done"
        else:
            return "None"
    else:
        return redirect(url_for('login'))


@app.route('/freqProCheck')
def freqProCheck():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/docxDataset-freq/status.sts")
        if(path.is_file()):
            return "Done"
        else:
            return "None"
    else:
        return redirect(url_for('login'))


@app.route('/symspellGetter')
def symspellGetter():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/Symspell_Dataset.txt")
        if(path.is_file()):
            return "Done"
        else:
            return "None"
    else:
        return redirect(url_for('login'))


@app.route('/symspellstatus')
def symspellstatus():
    if 'loggedin' in session and session['loggedin'] == True:
        path = Path("datasets/Symspell_Dataset.txt")
        if(path.is_file()):
            return "Done"
        else:
            return "Error"
    else:
        return redirect(url_for('login'))


@app.route('/symspellSetter')
def symspellSetter():
    if 'loggedin' in session and session['loggedin'] == True:
        # fc.freq_Alloter()
        sm.symspell_merger()
        return "Done"
    else:
        return redirect(url_for('login'))


@app.route('/freqGenerator')
def freqGenerator():
    if 'loggedin' in session and session['loggedin'] == True:
        f = open("datasets/docxDataset-freq/status.sts",
                 mode='w', encoding='utf-8')
        f.truncate(0)
        f.close()
        fg.files2freq()  # function to generate
        os.remove("datasets/docxDataset-freq/status.sts")
        return "Done"
    else:
        return redirect(url_for('login'))


@app.route('/wordseqGenerator')
def wordseqGenerator():
    if 'loggedin' in session and session['loggedin'] == True:
        f = open("datasets/docxDataset/status.sts", mode='w', encoding='utf-8')
        f.truncate(0)
        f.close()
        wg.file2pp()  # function to generate
        os.remove("datasets/docxDataset/status.sts")
        return "Done"
    else:
        return redirect(url_for('login'))


@app.route('/removelocalwords', methods=['GET', 'POST'])
def removelocalwords():
    if 'loggedin' in session and session['loggedin'] == True:
        word = request.json['data']
        option = request.json['flag']
        dict_ = {}
        with open(fp.userWordFile, mode='r', encoding='utf-8') as inFile:
            data = inFile.read()
            list_ = data.split("\n")
            for i in list_:
                temp = i.split("->")
                if len(temp) == 2:
                    if temp[1] not in dict_ and temp[0] != word and len(temp[0]) >= 2:
                        dict_[temp[1]] = temp[0]
            if option == "add":
                # Check Twice Before Proceeding
                with open(fp.BloomFilterModel, 'a', encoding='utf-8') as inFile2:
                    inFile2.write("\n"+word)
                # Check Twice Before Proceeding
                with open(fp.SymspellModel, 'a', encoding='utf-8') as inFile1:
                    inFile1.write("\n{} {}".format(word, "1"))
            elif option == "remove":
                pass
        with open(fp.userWordFile, 'w', encoding='utf-8') as inFile:
            inFile.truncate(0)
            str = []
            for i in dict_:
                str.append("{}->{}".format(dict_[i], i))
            res = "\n".join(str)
            inFile.write(res)
        return "True"
    else:
        return redirect(url_for('login'))


@app.route('/symspell', methods=['POST'])
def symspell():
    word = request.json['data']
    import string
    for c in string.punctuation:
        word = word.replace(c, "")
    for i in ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"]:
        word = word.replace(i, "")
    suggestion = snippets.suggestionReturner(word)
    return jsonify(str(suggestion).split(":")[0])


@app.route('/blooms', methods=['POST'])
def blooms():
    word = request.json['data']
    import string
    for c in string.punctuation:
        word = word.replace(c, "")
    for i in ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"]:
        word = word.replace(i, "")
    if len(word) > 0:
        id_ = hashlib.md5(word.encode('utf-8')).hexdigest()[:12]
        return jsonify({"status": bf.bloom_lookup(word), "id": id_, "word": request.json['data']})
    else:
        # print("Not String")
        return jsonify({"status": "True", "id": "", "word": request.json['data']})


@app.route('/bloomsID', methods=['POST'])
def bloomsID():
    word = request.json['data']
    import string
    for c in string.punctuation:
        word = word.replace(c, "")
    for i in ["೦", "೧", "೨", "೩", "೪", "೫", "೬", "೭", "೮", "೯"]:
        word = word.replace(i, "")
        print(i, "   ", word)
    if len(word) > 0:
        id_ = hashlib.md5(word.encode('utf-8')).hexdigest()[:12]
        return jsonify({"status": bf.bloom_lookup(word), "id": id_, "word": request.json['data']})
    else:
        # print("Not String")
        return jsonify({"status": "True", "id": "", "word": request.json['data']})


@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404


if __name__ == '__main__':
    app.run(debug=False)
