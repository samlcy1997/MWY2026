"""Package the same Meta guidebook for opening directly as a local HTML file."""
from pathlib import Path
import base64
import mimetypes
import re
import sys

project=Path(__file__).resolve().parents[1]
root=project/'dist' if (project/'dist/index.html').exists() else project
output=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else project/'standalone/MWY2026-Meta-Test-Standalone.html'
source=(root/'index.html').read_text()
for name in ['meta-data.js','meta-integration.js']:
    code=(root/'assets'/name).read_text()
    code=re.sub(r'</script',r'<\\/script',code,flags=re.I)
    source,count=re.subn(r'<script\s+src="\./assets/'+re.escape(name)+r'\?v=[^"]+"></script>',lambda _: '<script>\n'+code+'\n</script>',source)
    assert count==1,(name,count)
css=(root/'assets/meta-integration.css').read_text()
source,count=re.subn(r'<link[^>]+href="\./assets/meta-integration\.css\?v=[^"]+"[^>]*>',lambda _: '<style>'+css+'</style>',source)
assert count==1,count
source=re.sub(r'<link[^>]+rel="manifest"[^>]*>','',source)
for asset in (root/'assets').rglob('*'):
    if not asset.is_file() or asset.suffix not in ['.jpg','.png','.webp','.ttf']:
        continue
    relative=asset.relative_to(root).as_posix()
    if relative not in source:
        continue
    mime=mimetypes.guess_type(asset.name)[0] or 'application/octet-stream'
    uri='data:'+mime+';base64,'+base64.b64encode(asset.read_bytes()).decode()
    source=source.replace('./'+relative,uri).replace(relative,uri)
# A file URL cannot install a Service Worker; its download control explains this instead.
source=source.replace('下載離線圖片','單檔版離線說明')
source=source.replace('出發前用Wi-Fi下載主要照片；街道地圖仍可能需要網絡。','此單檔已包含行程與本機參考圖；外部照片及街道地圖仍需網絡。')
assert not re.search(r'<(?:script|link)[^>]+(?:src|href)="\./assets/',source)
output.parent.mkdir(parents=True,exist_ok=True)
output.write_text(source)
print(output)
