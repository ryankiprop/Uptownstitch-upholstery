import os
from werkzeug.utils import secure_filename
from flask import current_app

try:
    import cloudinary
    import cloudinary.uploader
    CLOUDINARY_AVAILABLE = True
except Exception:
    CLOUDINARY_AVAILABLE = False


def upload_file(file_storage):
    """Upload a FileStorage object.

    If Cloudinary is configured (`CLOUDINARY_URL` env var), upload there and
    return the public URL. Otherwise save to `UPLOAD_FOLDER` and return a
    relative `/uploads/<filename>` path.
    """
    cloudinary_url = os.getenv('CLOUDINARY_URL')
    if CLOUDINARY_AVAILABLE and cloudinary_url:
        cloudinary.config(cloudinary_url=cloudinary_url)
        resp = cloudinary.uploader.upload(file_storage)
        return resp.get('secure_url')

    # Fallback: save locally in UPLOAD_FOLDER
    upload_folder = current_app.config.get('UPLOAD_FOLDER')
    if not upload_folder:
        raise RuntimeError('UPLOAD_FOLDER is not configured')
    os.makedirs(upload_folder, exist_ok=True)
    filename = secure_filename(file_storage.filename)
    dest_path = os.path.join(upload_folder, filename)
    file_storage.save(dest_path)
    return f"/uploads/{filename}"
