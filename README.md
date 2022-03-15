# spaice
 Engineering Challenge - Software Engineer
-How to run ? 
1. npm install
2. node main.js
3. type commands: 

- ADD PRODUCT
- ADD WAREHOUSE
- STOCK
- UNSTOCK
- LIST PRODUCTS
- LIST WAREHOUSES
- LIST WAREHOUSE

Example

Here is an example session to show you what a run of your program should look like.

Example Input is prepended with &gt;

Example output is not prepended with &gt;.

&gt;ADD WAREHOUSE 970

&gt;ADD WAREHOUSE 45

&gt;ADD WAREHOUSE 2

&gt;LIST WAREHOUSES

WAREHOUSES

970

45

2

&gt;ADD PRODUCT "Sofia Vegara 5 Piece Living Room Set"

38538505-0767-453f-89af-d11c809ebb3b

&gt;ADD PRODUCT "BED" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70
&gt;ADD PRODUCT "TRUNK" 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70

ERROR ADDING PRODUCT PRODUCT with SKU 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70

ALREADY EXISTS

&gt;LIST PRODUCTS

Sofia Vegara 5 Piece Living Room Set 38538505-0767-453f-89af-d11c809ebb3b

BED 5ce956fa-a71e-4bfb-b6ae-5eeaa5eb0a70

&gt;STOCK 38538505-0767-453f-89af-d11c809ebb3b 970 1000

&gt;LIST WAREHOUSE 970

ITEM NAME ITEM_SKU QTY

Sofia Vegara 5 Piece Living Room Set 38538505-0767-453f-89af-d11c809ebb3b 1000




A command log history file called "commandLogHistory.txt" will be stored in the same folder.