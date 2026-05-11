#!/bin/bash

echo "=== EXTRACTING FIRST 10 IMAGE VALUES FROM products.json ==="
images_from_products=$(grep -o '"image"[^,]*' src/data/products.json | sed 's/"image": "//' | sed 's/"$//' | head -10)
echo "$images_from_products"

echo -e "\n=== EXTRACTING FIRST 10 IMAGEMAP KEYS FROM data.js ==="
images_from_datajs=$(grep -o '"small_size_product_img_[^"]*"' src/data.js | sed 's/"//g' | head -10)
echo "$images_from_datajs"

echo -e "\n=== COMPARISON RESULTS ==="
echo "products.json images:" > /tmp/products_images.txt
echo "$images_from_products" >> /tmp/products_images.txt

echo "data.js imageMap keys:" > /tmp/datajs_images.txt
echo "$images_from_datajs" >> /tmp/datajs_images.txt

echo "Checking line-by-line match:"
paste <(echo "$images_from_products") <(echo "$images_from_datajs") | while IFS=$'\t' read -r prod datajs; do
  if [ "$prod" = "$datajs" ]; then
    echo "✓ MATCH: $prod"
  else
    echo "✗ MISMATCH: '$prod' vs '$datajs'"
  fi
done

echo -e "\n=== SUMMARY ==="
diff_count=$(diff <(echo "$images_from_products") <(echo "$images_from_datajs") | grep -c .)
if [ $diff_count -eq 0 ]; then
  echo "All 10 images MATCH exactly!"
else
  echo "Found differences. Running diff:"
  diff <(echo "$images_from_products") <(echo "$images_from_datajs")
fi
