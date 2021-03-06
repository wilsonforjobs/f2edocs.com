var fs = require('fs');

var bookConf = fs.readFileSync(`${__dirname}/../book.json`);
var bookJson = JSON.parse(bookConf);
var navs = bookJson.navs;

function getActiveNavs(name) {
    return navs.map((nav) => Object.assign({}, nav, {
        active: nav.name === name
    }));
}

navs.forEach((nav) => {
    if (nav.name) {
        fs.writeFileSync(
            `${__dirname}/../${nav.name}/book.json`,
            JSON.stringify(Object.assign({}, bookJson, {
                navs: getActiveNavs(nav.name)
            }))
        );
        console.log(`${nav.name}/book.json finished`);
    }
});
