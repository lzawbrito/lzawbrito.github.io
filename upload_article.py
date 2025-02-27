import json
import os 
import argparse
from datetime import datetime
import shutil

MD_PATH = './public/docs/articles/'
DRAFTS_PATH = './public/docs/articles/drafts/'
DEST_PATH = './public/docs/articles/'
INDEX_PATH = './src/articles/'
DOWNLOAD_PATH = '/docs/articles/'

def parse_args():
	"""
	Parse script arguments.
	
	Returns: path, copy
	"""
	parser = argparse.ArgumentParser(
						prog = 'UploadArticle',
						description = 'Upload article to website.')

	parser.add_argument('filename')
	parser.add_argument('-c', '--copy', action='store_true')
	parser.add_argument('-u', '--update', action='store_true')
	args = parser.parse_args()

	p = args.filename
	copy = args.copy
	update = args.update

	if not p.endswith('.md'): 
		raise ValueError("Not a markdown file!")

	# Check if just filename or full path given.
	path = os.path.normpath(p)
	if len(path.split(os.sep)) == 1:
		if update:
			p = os.path.join(DEST_PATH, p)
		else:
			p = os.path.join(DRAFTS_PATH, p)
	return p, copy, update

def parse_file(p):
	"""
	Read file and return dict with relevant data and metadata.
	
	Returns: article_json
	"""
	f = open(p)
	print('')
	print('Parsing ' + os.path.basename(p) + '... ')

	article_fname = os.path.splitext(os.path.basename(p))[0]
	line_list = f.readlines()
	title = line_list[0].replace('# ', '').replace('\n', '')
	subtitle = line_list[1].replace('## ', '').replace('\n', '')
	path = title.lower().replace(' ', '-')

	now = datetime.now()
	date = now.strftime("%m/%d/%Y")
	time = now.strftime("%H:%M:%S")

	content = ''
	j = 0
	for i in line_list[3:]:
		content += i
		j += 1

	summary = content[0:750]
	return {
		'path': path,
		'date': date, 
		'time': time,
		'title': title,
		'subtitle': subtitle,
		'content': content,
		'summary': summary, 
		'link': DOWNLOAD_PATH + os.path.basename(p)
	}


def update_json(f_data, update):
	"""
	Update existing article json file.
	"""
	# First read contents of file and store in memory
	json_dicts = []
	with open(os.path.join(DEST_PATH, 'index.json'), 'r') as outfile:
		path = f_data['path']
		current_json_dicts = json.load(outfile)
		for a in current_json_dicts:
			if a['path'] == f_data['path']: 
				if update: 
					f_data['date'] = a['date']
					f_data['time'] = a['time']
					continue 

				replace = input(f'Article with path: {path} already exists. Replace (Y/n)? ')
				if replace == 'n':
					quit()
				else: 
					keep_date = input(f'Keep original date (y/N)? ')
					if keep_date == 'y':
						f_data['date'] = a['date']
						f_data['time'] = a['time']
						
					continue 
			json_dicts.append(a)

		json_dicts.append(f_data)

	# ...then write to that same file.
	with open(os.path.join(DEST_PATH, 'index.json'), 'w') as outfile:
		js_object = json.dumps(json_dicts, indent=4)
		outfile.write(js_object)

	if update: 
		print('Updated article:')
	else: 
		print('Stored article:')
	
	print(f"\tTitle:\t\t{f_data['title']}")
	print(f"\tSubtitle:\t{f_data['subtitle']}")
	print(f"\tPath:\t\t{f_data['path']}")
	print(f"\tDate/Time:\t{f_data['date']} @ {f_data['time']}")

def move_files(p, copy):
	"""
	Copy article if copy == True, else move it to website public article dir
	"""
	if copy: 
		shutil.copyfile(p, os.path.join(MD_PATH, os.path.basename(p)))
		print('Copied file to ' + os.path.join(MD_PATH, os.path.basename(p)))
	else: 
		shutil.move(p, os.path.join(MD_PATH, os.path.basename(p)))	
		print('Moved file to ' + os.path.join(MD_PATH, os.path.basename(p)))

if __name__ == '__main__':
	p, copy, update = parse_args()	
	article_json = parse_file(p)
	update_json(article_json, update)
	move_files(p, copy)
	print('Done.\n')