# -*- coding: utf-8 -*-
"""
Created on Fri Oct  2 12:00:56 2020

@author: bh11
"""

from os import listdir
from os.path import isfile, join

print('Running gentypes...')

if __name__ == '__main__':
    print('Scanning icon directory...')
    path = './src/assets/recipe/icons'
    onlyFiles = [f[:-4] for f in listdir(path) if isfile(join(path, f))]
    print('Generating icon types...')
    output = 'export type IconName =\n\t  \'NONE\''
    for file in onlyFiles:
        output += '\n\t| \'' + file + '\''
    print('Opening output file...')
    outputFile = open('./src/components/recipe/types/recipe.types.ts' , "w")
    print('Writing types to output file...')
    outputFile.write(output)
    print('Done.')
else:
    print('ERROR: this script must be run as the top level script environment.')
    raise Exception('Script was not run as top level script environment!')