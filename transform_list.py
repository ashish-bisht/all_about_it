import re

def transform_html():
    with open('question_list.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove "⭐NEW" badges
    content = re.sub(r'<span class="badge badge-new">⭐NEW</span>', '', content)

    # 2. Convert Tables to Grid
    # We need to find each "section" and transform its table
    # Regex to capture the table rows
    
    def row_to_card(match):
        row_content = match.group(0)
        
        # Extract data
        # Checkbox
        checkbox_match = re.search(r'<input[^>]*>', row_content)
        checkbox = checkbox_match.group(0) if checkbox_match else ""
        
        # Name & Link
        link_match = re.search(r'<a href="([^"]+)" class="question-name">([^<]+)</a>', row_content)
        link = link_match.group(1) if link_match else "#"
        name = link_match.group(2) if link_match else "Unknown"
        
        # Badge
        badge_match = re.search(r'<span class="badge ([^"]+)">([^<]+)</span>', row_content)
        badge_class = badge_match.group(1) if badge_match else ""
        badge_text = badge_match.group(2) if badge_match else ""
        
        # Why Important
        why_match = re.search(r'<td class="why-important">\s*(.*?)\s*</td>', row_content, re.DOTALL)
        why_text = why_match.group(1).strip() if why_match else ""

        # Construct Card HTML
        card = f'''
        <div class="question-card" data-priority="{badge_text.lower() if badge_text else ''}">
            <div class="card-header">
                {checkbox}
                <div class="card-title-group">
                    <a href="{link}" class="question-title-link">{name}</a>
                    <div class="card-meta">
                        <span class="badge-pill {badge_class}">{badge_text}</span>
                    </div>
                </div>
            </div>
            <p class="card-reason">{why_text}</p>
        </div>
        '''
        return card

    # Process sections
    # We'll replace the entire <table>...</table> with <div class="questions-grid">...cards...</div>
    
    def replacer(match):
        table_html = match.group(0)
        # Find all rows
        rows = re.findall(r'<tr>(.*?)</tr>', table_html, re.DOTALL)
        
        cards_html = []
        for row in rows:
            if '<th>' in row: continue # Skip header
            # We need to reconstruct the full row string for the row_to_card function or just parse 'row'
            # let's adapt row_to_card to take the inner html
            # But wait, regex inside regex is tricky. 
            
            # Let's extract per row manually here
            checkbox_match = re.search(r'<input[^>]*>', row)
            checkbox = checkbox_match.group(0) if checkbox_match else ""
            
            link_match = re.search(r'<a href="([^"]+)" class="question-name">([^<]+)</a>', row)
            link = link_match.group(1) if link_match else "#"
            name = link_match.group(2) if link_match else "Unknown"
            
            # Find ALL badges in the row (but we ignored NEW already)
            # Actually we stripped NEW globally first.
            badge_match = re.search(r'<span class="badge ([^"]+)">([^<]+)</span>', row)
            badge_class = badge_match.group(1) if badge_match else ""
            badge_text = badge_match.group(2) if badge_match else ""
            
            why_match = re.search(r'<td class="why-important">\s*(.*?)\s*</td>', row, re.DOTALL)
            why_text = why_match.group(1).strip() if why_match else ""
            
            card = f'''
            <div class="q-card">
                <div class="q-header">
                    <a href="{link}" class="q-title">{name}</a>
                    {checkbox}
                </div>
                <div class="q-badges">
                    <span class="q-badge {badge_class}">{badge_text.replace('🔴 ', '').replace('🟡 ', '').replace('🟢 ', '')}</span>
                </div>
                <div class="q-reason">{why_text}</div>
            </div>'''
            cards_html.append(card)
            
        return f'<div class="questions-grid">{"".join(cards_html)}</div>'

    # Do the replacement
    new_content = re.sub(r'<table class="questions-table">.*?</table>', replacer, content, flags=re.DOTALL)
    
    # Write back
    with open('question_list.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    transform_html()
