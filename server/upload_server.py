from flask import Flask, request
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload_image', methods=['POST'])
def upload_image():
    file = request.files.get('file')
    if file is None:
        return {'error': 'no file provided'}, 400
    filename = secure_filename(file.filename)
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(save_path)
    return {'status': 'ok', 'filename': filename}

if __name__ == '__main__':
    # 默认监听 5000 端口
    app.run(host='0.0.0.0', port=5000)
