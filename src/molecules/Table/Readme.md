    const rows = [
     {
       "cells": [
         {
           "text": "Product price",
           "isHeader": true
         }, {
           "text": "£74.91",
           "isHeader": false
         }
       ]
     }, {
       "cells": [
         {
           "text": "Voucher discount",
           "isHeader": true
         }, {
           "text": "£10.00",
           "isHeader": false
         }
       ]
     }, {
       "cells" : [
         {
           "text": "Care Plan(s)",
           "isHeader": true
         }, {
           "text": "£10.00",
           "isHeader": false
         }
       ]
     },{
       "cells" : [
         {
           "text": "Delivery",
           "isHeader": true
         }, {
           "text": "FREE",
           "isHeader": false
         }
       ] }, {
       "cells"  :
       [
         {
           "text": "Total (inc VAT)",
           "isHeader": true
         }, {
         "text": "£74.91",
         "isHeader": false
       }
       ]
     }
    ];
    
    <Table
        rows={rows}
        headStyle={{ width: '150px', fontWeight: 'normal' }}
        colStyle={{ padding: '3px 0 3px 14px', fontWeight: 'bold' }}
        colClasses="dc-border-left"
        rowClasses="dc-table-last-indented"
    />
    