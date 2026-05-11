#!/bin/bash

echo "=== FULL IMAGE COMPARISON (ALL PRODUCTS) ==="
echo ""

# Extract all images from products.json
products_images=$(grep -o '"image"[^,]*' src/data/products.json | sed 's/"image": "//' | sed 's/"$//')

# Extract all imageMap keys from data.js
datajs_images=$(grep -o '"small_size_product_img_[^"]*"' src/data.js | sed 's/"//g')

# Create temp files
echo "$products_images" > /tmp/all_products.txt
echo "$datajs_images" > /tmp/all_datajs.txt

# Count totals
prod_count=$(echo "$products_images" | wc -l)
datajs_count=$(echo "$datajs_images" | wc -l)

echo "Total images in products.json: $prod_count"
echo "Total imageMap keys in data.js: $datajs_count"
echo ""

if diff /tmp/all_products.txt /tmp/all_datajs.txt > /tmp/diff_result.txt 2>&1; then
  echo "✓ SUCCESS: ALL IMAGES MATCH EXACTLY!"
  echo "  No differences found between products.json images and data.js imageMap keys."
else
  echo "✗ DIFFERENCES FOUND:"
  cat /tmp/diff_result.txt
fi

echo ""
echo "=== VERIFICATION TABLE (FIRST 15 ENTRIES) ==="
paste /tmp/all_products.txt /tmp/all_datajs.txt | nl | head -15
