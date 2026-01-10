#!/usr/bin/env python3
"""生成简单的 Telegram 风格图标"""
import struct
import zlib
import os

def create_png(size, filepath):
    """创建指定大小的 PNG 图标"""

    def make_chunk(chunk_type, data):
        chunk = chunk_type + data
        crc = zlib.crc32(chunk) & 0xffffffff
        return struct.pack('>I', len(data)) + chunk + struct.pack('>I', crc)

    # Telegram blue #229ED9
    r, g, b = 34, 158, 217

    pixels = []
    for y in range(size):
        for x in range(size):
            pixels.extend([r, g, b])

    raw_data = b'RGB' + struct.pack('>II', size, size) + b'\x08\x00' + bytes(pixels)

    with open(filepath, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(make_chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)))
        f.write(make_chunk(b'IDAT', zlib.compress(raw_data, 9)))
        f.write(make_chunk(b'IEND', b''))

    print(f'Created {filepath}')

os.chdir(os.path.dirname(os.path.abspath(__file__)))
os.makedirs('icons', exist_ok=True)

for s in [16, 48, 128]:
    create_png(s, f'icons/icon-{s}.png')

print('\n图标生成完成！需要更漂亮的图标请自行替换。')
