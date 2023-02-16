import path from 'path';
import fs from 'fs';

const deleteDistAssets = () => {
    if (fs.existsSync(path.join(__dirname, '../public'))) {
        fs.rmdirSync(path.join(__dirname, '../public'), {
            recursive: true,
        });
    }
};

deleteDistAssets();
