fx_version "cerulean"
lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/index.html'

client_script "client/**/*"
server_script "config.lua"
server_script "server/**/*"

files {
	'web/build/index.html',
	'web/build/**/*',
}
