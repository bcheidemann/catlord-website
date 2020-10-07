# -*- coding: utf-8 -*-
"""
Created on Fri Oct  2 12:00:56 2020

@author: bh11
"""

import argparse
from sys import exit
from os import listdir, remove
from os.path import isdir, isfile, join
from shutil import copyfile
from datetime import date

parser = argparse.ArgumentParser(
    description='Generates icon types for the recipe component.')
parser.add_argument('--regen-item-props', dest='genitemprops', action='store_const',
                   const=True, default=False,
                   help='Regenerate item props with default values. Use --preserve-item-props to only regenerate new props and keep existing values.')
parser.add_argument('--preserve-item-props', dest='preserveitemprops', action='store_const',
                   const=True, default=False,
                   help='Do not overwrite exisiting item props when regenerating item props - only add new ones.')
parser.add_argument('--wipe', dest='wipe', action='store_const',
                   const=True, default=False,
                   help='Delete all files from the working icons directory before condensing source icon folders')
parser.add_argument('--overwrite', dest='overwrite', action='store_const',
                   const=True, default=False,
                   help='Overwrite existing icons in the working icons directory when conflicts arrise')
parser.add_argument('--ignore-warnings', dest='warnings', action='store_const',
                   const=False, default=True,
                   help='Don\'t log warnings')

try:
    ARGS = parser.parse_args()
except:
    print('Could not parse arguments. Try -h for usage.')
    exit()

BASE_ASSETS_PATH = './src/assets/recipe'
BASE_PATH = './src/components/recipe'

print('Running gentypes...')

def wipeWorkingIconsFolder():
    path = join(BASE_ASSETS_PATH, 'icons')
    onlyFiles = [join(path, f) for f in listdir(path) if isfile(join(path, f))]
    for file in onlyFiles:
        try:
            remove(file)
        except:
            print('ERROR: Unable to remove ' + file + ' for unknown reason.')

def getItemPropsTemplate():
    templateFile = open(join(BASE_PATH, 'templates', 'types.template.tsx.tmp') , "r")
    templateCode = templateFile.read()
    templateFile.close()
    return templateCode

def condenseIconsFolders():
    onlyDirs = [join(BASE_ASSETS_PATH, f) for f in listdir(BASE_ASSETS_PATH) if isdir(join(BASE_ASSETS_PATH, f)) and f.find('icons_') == 0]
    for dir in onlyDirs:
        onlyFiles = [f for f in listdir(dir) if isfile(join(dir, f))]
        for file in onlyFiles:
            filePath = join(dir, file)
            dstFilePath = join(BASE_ASSETS_PATH, 'icons', file)
            try:
                if not isfile(dstFilePath) or ARGS.overwrite:
                    if isfile(dstFilePath) and ARGS.warnings:
                        print('WARNING: Overwriting ' + dstFilePath + ' with ' + filePath + '.')
                    copyfile(filePath, dstFilePath)
                elif ARGS.warnings:
                    print('WARNING: Failed to copy ' + filePath + ' to ' + dstFilePath + ' because file already exists.')
            except:
                print('ERROR: Failed to copy ' + filePath + ' to ' + dstFilePath + ' for unknown reason')


if __name__ == '__main__':
    if ARGS.wipe:
        print('Wiping contents of working icons directory...')
        wipeWorkingIconsFolder()
    print('Condensing all icons folders into ' + BASE_ASSETS_PATH + '/icons...')
    condenseIconsFolders()
    print('Scanning icon directory...')
    path = join(BASE_ASSETS_PATH, 'icons')
    onlyFiles = [f[:-4] for f in listdir(path) if isfile(join(path, f))]
    print('Generating icon types for ' + str(len(onlyFiles)) + ' icons...')
    output = 'export type IconName =\n\t  \'NONE\''
    existingItemPropsCode = ''
    outputCode = '// GENERATED ON ' + date.today().strftime("%B %d, %Y") + '\n'
    itemPropsWriteType = 'w'
    if ARGS.genitemprops:
        if ARGS.preserveitemprops:
            itemPropsFileR = open(join(BASE_PATH, 'types', 'item.props.tsx'), 'r')
            existingItemPropsCode = itemPropsFileR.read()
            itemPropsFileR.close()
            itemPropsWriteType = 'a'
        else:
            outputCode += getItemPropsTemplate()
    for file in onlyFiles:
        output += '\n\t| \'' + file + '\''
        if ARGS.genitemprops:
            propString = 'ItemProps.set(\'' + file + '\', { imageRendering: \'pixelated\' });'
            if ARGS.preserveitemprops:
                if existingItemPropsCode.find('ItemProps.set(\'' + file + '\', {') == -1:
                    outputCode += propString + '\n'
            else:
                outputCode += propString + '\n'
    
    print('Opening output types file...')
    outputTypesFile = open('./src/components/recipe/types/recipe.types.ts' , "w")
    print('Writing types to output types file...')
    outputTypesFile.write(output)
    print('Closing output types file...')
    outputTypesFile.close()
    if ARGS.genitemprops:
        print('Opening output props file...')
        outputPropsFile = open(join(BASE_PATH, 'types', 'item.props.tsx'), itemPropsWriteType)
        print('Writing props to output props file...')
        outputPropsFile.write(outputCode)
        print('Closing output props file...')
        outputPropsFile.close()
    print('Done.')
else:
    print('ERROR: this script must be run as the top level script environment.')
    raise Exception('Script was not run as top level script environment!')