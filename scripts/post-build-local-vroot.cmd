set "local_zip=C:\Users\m.rafat\source\vroot\dist\vroot\vroot.zip"
set "local_dir=C:\Users\m.rafat\source\vroot\dist\vroot\browser"
set "sz="C:\Program Files\7-Zip\7z.exe""
set "ssh=C:\Windows\System32\OpenSSH\ssh.exe"
set "scp=C:\Windows\System32\OpenSSH\scp"
set "remote=root@10.99.77.244"

del /f %local_zip%
%sz% a %local_zip% %local_dir%\*

%scp% %local_zip% %remote%:/var/www/
%ssh% %remote% "rm -r /var/www/html/vroot; unzip /var/www/vroot.zip -d /var/www/html/vroot; rm -f /var/www/vroot.zip"