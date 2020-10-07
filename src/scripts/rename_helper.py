# -*- coding: utf-8 -*-
"""
Created on Sat Oct  3 10:38:00 2020

@author: bh11
"""

from os import listdir, rename
from os.path import isfile, join

print('Running rename helper...')

if __name__ == '__main__':
    dirPath = input('Enter directory path: ')
    print('Scanning ' + dirPath + ' for files...')
    onlyFiles = [f for f in listdir(dirPath) if isfile(join(dirPath, f))]
    for file in onlyFiles:
        filePath = join(dirPath, file)
        fileName = '.'.join(file.split('.')[:-1])
        fileExtension = '.' + file.split('.')[-1]
        newFileName = input(fileName + ' >> ')
        if newFileName != '':
            newFilePath = join(dirPath, newFileName + fileExtension)
            print('Renaming ' + filePath + ' to ' + newFilePath + '...')
            rename(filePath, newFilePath)
        else:
            print('Skipping ' + filePath + '...')
    print('Done.')
else:
    print('ERROR: this script must be run as the top level script environment.')
    raise Exception('Script was not run as top level script environment!')