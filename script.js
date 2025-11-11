function calculate() {
    // ดึงค่าจาก HTML Elements
    const inputAmount = parseFloat(document.getElementById('inputAmount').value) || 0;
    const calcType = document.getElementById('calculationType').value;
    const whtRate = parseFloat(document.getElementById('whtRate').value);
    const vatRate = 0.07;
    
    let priceBeforeVat = 0;
    let vatAmount = 0;
    let priceIncludingVat = 0;
    let whtAmount = 0;
    let netPayment = 0;

    // --- 1. กำหนดราคาก่อน/รวม VAT ---
    if (calcType === 'VAT_INCLUDED') {
        // ยอดที่ป้อนคือ "ราคารวม VAT" (Gross)
        priceIncludingVat = inputAmount;
        priceBeforeVat = priceIncludingVat / (1 + vatRate);
        vatAmount = priceIncludingVat - priceBeforeVat;
    } else if (calcType === 'VAT_EXCLUDED') {
        // ยอดที่ป้อนคือ "ราคาก่อน VAT" (Net)
        priceBeforeVat = inputAmount;
        vatAmount = priceBeforeVat * vatRate;
        priceIncludingVat = priceBeforeVat + vatAmount;
    }

    // --- 2. คำนวณหัก ณ ที่จ่าย (WHT) ---
    // WHT คำนวณจากราคาก่อน VAT เสมอ
    whtAmount = priceBeforeVat * whtRate;

    // --- 3. คำนวณยอดสุทธิ ---
    // ยอดสุทธิ = ราคารวม VAT - ภาษีหัก ณ ที่จ่าย
    netPayment = priceIncludingVat - whtAmount;


    // --- 4. แสดงผลลัพธ์พร้อมจัดรูปแบบตัวเลข (ทศนิยม 2 ตำแหน่ง) ---
    const formatter = new Intl.NumberFormat('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    document.getElementById('priceBeforeVat').textContent = formatter.format(priceBeforeVat);
    document.getElementById('vatAmount').textContent = formatter.format(vatAmount);
    document.getElementById('priceIncludingVat').textContent = formatter.format(priceIncludingVat);
    document.getElementById('whtAmount').textContent = formatter.format(whtAmount);
    document.getElementById('netPayment').textContent = formatter.format(netPayment);
}

// เรียกใช้คำนวณทันทีที่เปิดหน้าเว็บ เพื่อให้แสดงค่า 0.00
document.addEventListener('DOMContentLoaded', calculate);