from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage
from collections import deque

def remove_background():
    img = Image.open('public/images/corporate_passenger_suv.jpg').convert('RGBA')
    w, h = img.size
    arr = np.array(img)
    
    # Calculate difference from pure white (255, 255, 255)
    r = arr[:, :, 0].astype(float)
    g = arr[:, :, 1].astype(float)
    b = arr[:, :, 2].astype(float)
    
    # In corporate_passenger_suv.jpg, the background is studio white/near-white:
    # r > 230, g > 230, b > 230 and color variation is very low (r-g < 15, etc.)
    is_light = (r > 228) & (g > 228) & (b > 228)
    color_diff = np.maximum(np.maximum(np.abs(r - g), np.abs(r - b)), np.abs(g - b))
    is_white_candidate = is_light & (color_diff < 16)
    
    # BFS flood-fill from all 4 borders to only select exterior background
    # That way white highlights on vehicle body / headlights are preserved
    bg_mask = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    # Add border pixels that match candidate
    for x in range(w):
        if is_white_candidate[0, x]:
            bg_mask[0, x] = True
            queue.append((0, x))
        if is_white_candidate[h - 1, x]:
            bg_mask[h - 1, x] = True
            queue.append((h - 1, x))
            
    for y in range(h):
        if is_white_candidate[y, 0]:
            bg_mask[y, 0] = True
            queue.append((y, 0))
        if is_white_candidate[y, w - 1]:
            bg_mask[y, w - 1] = True
            queue.append((y, w - 1))
            
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not bg_mask[ny, nx] and is_white_candidate[ny, nx]:
                    bg_mask[ny, nx] = True
                    queue.append((ny, nx))
                    
    # Smooth edges with Gaussian filter
    alpha = np.ones((h, w), dtype=np.float32) * 255.0
    alpha[bg_mask] = 0.0
    
    # Filter alpha
    alpha_smooth = ndimage.gaussian_filter(alpha, sigma=0.8)
    
    # Hard zero on definitely exterior
    eroded_bg = ndimage.binary_erosion(bg_mask, iterations=1)
    alpha_smooth[eroded_bg] = 0.0
    
    out_arr = arr.copy()
    out_arr[:, :, 3] = np.clip(alpha_smooth, 0, 255).astype(np.uint8)
    
    out_img = Image.fromarray(out_arr)
    out_img.save('public/images/corporate_passenger_suv_transparent.png', 'PNG')
    print('Generated public/images/corporate_passenger_suv_transparent.png successfully!')

if __name__ == '__main__':
    remove_background()
