// Function Navigasi Switch Page
window.onload = () => {
    const tab_switchers = document.querySelectorAll('[data-switcher]');
    for (let index = 0; index < tab_switchers.length; index++) {
        const tab_switcher = tab_switchers[index];
        const pageData = tab_switcher.dataset.tab;

        tab_switcher.addEventListener('click', () => {
            document.querySelector('nav ul li.is-active').classList.remove('is-active');
            tab_switcher.parentNode.classList.add('is-active');

            switchPage(pageData);
        })
    }
}

function switchPage(pageData) {
    const currentPage = document.querySelector('.contents .content.is-active');
    currentPage.classList.remove('is-active');

    const nextPage = document.querySelector(`.contents .content[data-page=${pageData}]`);
    nextPage.classList.add('is-active');
}

const local = 'id-ID';
const options = {
    style: 'currency',
    currency: 'IDR'
}
function formatRupiah(angka) { // Merubah Int ke Rupiah
    const formattedNumber = new Intl.NumberFormat(local, options).format(angka).slice(0, -3);
    return formattedNumber;
}

function convertDatasetnominalToInnerHTML(elementDatasetnominal, elementAngka) {
    if (elementAngka) {
        const nominal = parseInt(elementDatasetnominal.dataset.nominal);
        const convertToRupiah = formatRupiah(nominal);
        elementAngka.innerHTML = convertToRupiah;
    }
}

const navigasiDesktop = document.querySelector('nav');

// Content > Dashboard
var dompetDashboard = document.querySelectorAll('.content.dashboards .dashboard .data-dompet .data');
dompetDashboard.forEach(dompet => {
    const angkaDompet = dompet.querySelector('.nominal');
    convertDatasetnominalToInnerHTML(dompet, angkaDompet);
})


// Content > Dompet
var dompetDompet = document.querySelectorAll('.content.dompets .dompet .kumpulanDompet .wrapperDompet .data');
dompetDompet.forEach(dompet => {
    const angkaDompet = dompet.querySelector('.wrapper .nominal');
    convertDatasetnominalToInnerHTML(dompet, angkaDompet);
});

var totalNominalDompetMobile = document.querySelector('.content.dompets .totalDompetMobile .nominal .angka');
var totalNominalDompet = document.querySelector('.dompet .totalDompetYangDipilih .nominal .angka');
var nominalDompetYangDipilih = 0;
const checkboxDompet = document.querySelector('input#nominalDompet');
const kumpulanDompet = document.querySelectorAll('.kumpulanDompet .data');
const inputCheckbox = document.querySelector('input#cbx-45');
const wrapperContentDompet = document.querySelector('.dompet');

kumpulanDompet.forEach(dompet => {
    dompet.addEventListener('click', () => {
        if (dompet.classList.contains('selectNominal')) {
            cardSelect(dompet);
        }
    })
})

function cardSelect(dompet) { // Mengaktifkan Fitur Pilih Kartu
    var nominalElement = dompet.querySelector('.nominal .angka');
    var nominal = dompet.dataset.nominal;
    var convertAngka = parseInt(nominal);

    if (dompet.classList.contains('activeSelect')) {
        dompet.classList.remove('activeSelect');
        nominalDompetYangDipilih -= convertAngka;
    } else {
        dompet.classList.add('activeSelect');
        nominalDompetYangDipilih += convertAngka;
    }

    var angkaTotal = formatRupiah(nominalDompetYangDipilih, 'Rp. ');
    totalNominalDompet.innerHTML = angkaTotal;
    totalNominalDompetMobile.innerHTML = angkaTotal;
}
function checkedOrNo() { // Checking, Apakah CheckBox di Centang atau tidak
    if (document.querySelector('.pilihDompet input').checked) {
        console.log('Aktif');
        wrapperContentDompet.classList.add('moveTransform');
        kumpulanDompet.forEach(dompet => {
            dompet.classList.add('selectNominal');
        })
    } else {
        console.log('Tidak Aktif');
        wrapperContentDompet.classList.remove('moveTransform');
        kumpulanDompet.forEach(dompet => {
            dompet.classList.remove('selectNominal');
            dompet.classList.remove('activeSelect');
        })
        nominalDompetYangDipilih = 0;
        totalNominalDompet.innerHTML = 'Rp 0,00';
        totalNominalDompetMobile.innerHTML = 'Rp 0,00';
    }
}





// Content > Dompet > pageTambahData = Tambah Data Dompet
const btnTambahDataDesktop = document.querySelector('.dompets .dompet .tambahData button');
const btnTambahDataMobile_Dompet = document.querySelector('.dompets a.btnTambahDataMobile');
const btnTambahData = [btnTambahDataDesktop, btnTambahDataMobile_Dompet];
btnTambahData.forEach(btn => { // Ketika tombol Tambah Data ditekan
    btn.addEventListener('click', () => {
        document.querySelector('.dompets .pageTambahData').classList.add('is-active');
        navigasiDesktop.classList.add('blockFunction');
    })
})

const btnBatalTambahDataDompet_Dompet = document.querySelector('.dompets .pageTambahData .action button.batal');
btnBatalTambahDataDompet_Dompet.addEventListener('click', () => { // Ketika tombol Batal ditekan
    document.querySelector('.dompets .pageTambahData').classList.remove('is-active');
    navigasiDesktop.classList.remove('blockFunction');
})

// Content > Dompet > pageTambahData = Tambah Data Dompet > Select/Pilih Warna Dompet
const boxColors = document.querySelectorAll('.boxColor[data-selectBox]');
boxColors.forEach(boxColor => {
    boxColor.addEventListener('click', () => {
        document.querySelector('.boxColor.selected').classList.remove('selected');
        boxColor.classList.add('selected');
    })
})

const namaTambahData_PageDompet = document.querySelector('.dompets .pageTambahData .namaDompet input.nama');
const namaHasilTambahData_PageDompet = document.querySelector('.dompets .pageTambahData .hasil .dompet .nama');
namaTambahData_PageDompet.addEventListener('keyup', () => {
    if (namaTambahData_PageDompet.value != '') {
        namaHasilTambahData_PageDompet.innerHTML = namaTambahData_PageDompet.value;
    } else {
        namaHasilTambahData_PageDompet.innerHTML = 'Nama Dompet'
    }
})


// Content > History
var dompetHistory = document.querySelectorAll('.content.historys .history .data');
dompetHistory.forEach(dompet => {
    const angkaDompet = dompet.querySelector('.nominal .angka');
    convertDatasetnominalToInnerHTML(dompet, angkaDompet);
});


// Content > History > pageTambahData

const btnTambahData_PageHistory = document.querySelector('.historys .btnTambahData a');
const pageTambahData_PageHistory = document.querySelector('.historys form.tambahDataPage');
const btnBatalTambahData_PageHistory = document.querySelector('.historys form.tambahDataPage div.batal');
btnTambahData_PageHistory.addEventListener('click', () => {
    pageTambahData_PageHistory.classList.add('is-active');
    navigasiDesktop.classList.add('blockFunction');
})
btnBatalTambahData_PageHistory.addEventListener('click', () => {
    pageTambahData_PageHistory.classList.remove('is-active');
    navigasiDesktop.classList.remove('blockFunction');
})

const outputFormat_pageHistory = document.querySelector('.historys form.tambahDataPage .field.nominal span.formatAngka');
const inputTambahData_PageHistory = document.querySelector('.historys form.tambahDataPage .field.nominal .input input');
inputTambahData_PageHistory.addEventListener('keyup', () => {
    const angkaFormat = formatRupiah(inputTambahData_PageHistory.value);
    outputFormat_pageHistory.innerHTML = angkaFormat;
});

const btnTambahDataMobile_PageHistory = document.querySelector('.historys a.btnTambahDataMobile');
btnTambahDataMobile_PageHistory.addEventListener('click', () => {
    pageTambahData_PageHistory.classList.add('is-active');
})


// Content > Detail Dompet
const ctx = document.getElementById('myChart'); // Grafik
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mey', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Pemasukan',
            data: [12, 19, 3, 5, 2, 120, 65, 23, 81, 92, 10, 21],
            borderWidth: 1
        },
        {
            label: 'Pengeluaran',
            data: [15, 54, 12, 9, 41, 7, 98, 12, 2, 10, 82, 19],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});