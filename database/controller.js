import Execute from "./connection"

export const fetchBands = async ({ search = '', page = 1, pagination = 15 }) => {
    try {
        let total = 0;
        const searchParam = `'%${search}%'`;

        let query1 = "SELECT COUNT(*) as total FROM allocated_bands";
        query1 = search != '' ?
            query1.concat(" WHERE ")
                .concat("band LIKE").concat(searchParam)
                .concat(" OR ")
                .concat("manager LIKE").concat(searchParam)
            : query1;

        const limit = ` LIMIT ${(page - 1) * pagination}, ${pagination}`;
        let query2 = "SELECT id, band, manager FROM allocated_bands";
        query2 = search != '' ?
            query2.concat(" WHERE ")
                .concat("band LIKE").concat(searchParam)
                .concat(" OR ")
                .concat("manager LIKE").concat(searchParam)
                .concat(limit)
            : query2.concat(limit);


        const res1 = await Execute(query1)
        const res2 = await Execute(query2)

        total = res1.details.rows._array[0].total

        if (res2.status) {
            return ({
                data: res2.details.rows._array,
                total: total,
                pages: Math.ceil(total / pagination),
                status: true
            })
        } else {
            return ({
                error: "Outer Error",
                status: false
            })
        }

    } catch (error) {
        return ({
            error: "Inner Error",
            status: false
        })
    }
}

export const fetchBandById = async ({ bandId }) => {
    try {
        let query = "SELECT * FROM allocated_bands WHERE id = " + bandId + "";
        const res = await Execute(query)

        if (res.status) {
            let dataObj = res.details.rows._array[0];
            let data = [];
            for (const key in dataObj) {
                if (typeof dataObj[key] == 'string') {
                    if (dataObj[key].trim().length > 0) {
                        if (key == "manager") {
                            data.push({
                                key: "Band Manager",
                                value: dataObj[key]
                            })
                        } else if (key == "itu_r1") {
                            data.push({
                                key: "ITU Region 1 Allocated Services",
                                value: dataObj[key]
                            })
                        } else if (key == "iq") {
                            data.push({
                                key: "Iraq Allocated Services",
                                value: dataObj[key]
                            })
                        } else if (key == "footnotes") {
                            data.push({
                                key: "Band Footnotes",
                                value: dataObj[key]
                            })
                        } else if (key == "spectrum") {
                            data.push({
                                key: "Common Spectrum Applications",
                                value: dataObj[key]
                            })
                        } else if (key == "notes") {
                            data.push({
                                key: "Band Application Notes",
                                value: dataObj[key]
                            })
                        } else if (key == "ctsr") {
                            data.push({
                                key: "Common Technical Standards And Reports",
                                value: dataObj[key]
                            })
                        }
                    }
                }
            }
            return ({
                data: data,
                status: true
            })
        } else {
            return ({
                error: "Outer Error",
                status: false
            })
        }
    } catch (error) {
        return ({
            error: "Inner Error",
            status: false
        })
    }

    // let data = [
    //     {
    //         key: "ITU Region 1 Allocated Services",
    //         value: dataObj["itu_r1"]
    //     },
    //     {
    //         key: "Iraq Allocated Services",
    //         value: dataObj["iq"]
    //     },
    //     {
    //         key: "Band Footnotes",
    //         value: dataObj["footnotes"]
    //     },
    //     {
    //         key: "Common Spectrum Applications",
    //         value: dataObj["spectrum"]
    //     },
    //     {
    //         key: "Band Application Notes",
    //         value: dataObj["notes"]
    //     },
    //     {
    //         key: "Common Technical Standards And Reports",
    //         value: dataObj["ctsr"]
    //     }
    // ];
}