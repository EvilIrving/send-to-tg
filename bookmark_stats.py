#!/usr/bin/env python3
"""分析书签创建时间分布"""

import re
from datetime import datetime
from collections import Counter
from bs4 import BeautifulSoup

def extract_bookmarks_dates(html_file):
    """提取所有书签的创建日期"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    soup = BeautifulSoup(content, 'html.parser')
    links = soup.find_all('a', href=True)

    dates = []
    for a in links:
        if a.has_attr('ADD_DATE'):
            try:
                timestamp = int(a['ADD_DATE'])
                dt = datetime.fromtimestamp(timestamp)
                dates.append((a.get_text().strip()[:40], dt))
            except (ValueError, TypeError):
                pass
    return dates

def main():
    html_file = 'bookmarks_2026_1_10.html'
    bookmarks = extract_bookmarks_dates(html_file)

    if not bookmarks:
        print("未找到带日期的书签")
        return

    # 按年份和月份统计
    year_month = Counter()
    year = Counter()
    for title, dt in bookmarks:
        year_month[f"{dt.year}-{dt.month:02d}"] += 1
        year[dt.year] += 1

    print(f"共 {len(bookmarks)} 个带日期的书签\n")
    print("=" * 40)
    print("年份分布:")
    print("=" * 40)
    for y in sorted(year.keys(), reverse=True):
        bar = '█' * (year[y] // 20)
        print(f"{y}: {year[y]:>4} {bar}")

    print("\n" + "=" * 40)
    print("最近 12 个月:")
    print("=" * 40)
    for ym in sorted(year_month.keys(), reverse=True)[:12]:
        print(f"{ym}: {year_month[ym]:>3}")

    # 最老的 10 个书签
    print("\n" + "=" * 40)
    print("最老的 10 个书签:")
    print("=" * 40)
    for title, dt in sorted(bookmarks, key=lambda x: x[1])[:10]:
        print(f"{dt.strftime('%Y-%m-%d')} | {title}")

    # 最新的 10 个书签
    print("\n" + "=" * 40)
    print("最新的 10 个书签:")
    print("=" * 40)
    for title, dt in sorted(bookmarks, key=lambda x: x[1], reverse=True)[:10]:
        print(f"{dt.strftime('%Y-%m-%d')} | {title}")

if __name__ == '__main__':
    main()
