import{j as t}from"./vendor-wvIh0B1Y.js";import{D as i}from"./Datatable-DF0_bqzo.js";import{u as n,a as m,b as u,c as f}from"./itemsApi-D8qnj2Ql.js";import{c as a}from"./index-BmLuTXCK.js";const I=()=>{const{data:e}=n(),[o]=m(),[d]=u(),[c]=f(),l=[{field:"id",header:"Id"},{field:"fullName",header:"Full Name"},{field:"company",header:"Company Name"},{field:"description",header:"Description"},{field:"category",header:"Category"},{field:"field",header:"Field"},{field:"variant",header:"Variant"},{field:"oldPurchasePrice",header:"Old Purchase Price",body:({oldPurchasePrice:r})=>t.jsx("span",{children:a.format(r)})},{field:"purchasePrice",header:"Purchase Price",body:({purchasePrice:r})=>t.jsx("span",{children:a.format(r)})},{field:"oldSalePrice",header:"Old Sale Price",body:({oldSalePrice:r})=>t.jsx("span",{children:a.format(r)})},{field:"salePrice",header:"Sale Price",body:({salePrice:r})=>t.jsx("span",{children:a.format(r)})},{field:"stock",header:"Stock"},{field:"lowOnStock",header:"Low On Stock"}],s="item";return console.log(e==null?void 0:e.totalRecords),t.jsx(i,{data:e==null?void 0:e.data,columns:l,totalRecords:e==null?void 0:e.totalRecords,createRecord:o,updateRecord:d,deleteRecord:c,modalType:s})};export{I as default};