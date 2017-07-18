export default {
    datasets: {
        "5614ad9f-b58b-48fd-9b90-f63666a354e4": {
            config: {
                host: "nyuvis-web.poly.edu",
                index: "ieeevis2",
                info: "ieeevis/abstracts",
                name: "IEEE VIS - Abstracts",
                path: "es",
                port: "80",
                type: "abstract",
                useAdvanced: true
            },
            id: "5614ad9f-b58b-48fd-9b90-f63666a354e4",
            type: "Elasticsearch",
            hiddenFacets: ["authorIDs", "firstAuthorAffiliation", "link", "paperDoi", "references"]
        },
        "3af0fb70-a1a9-4169-b2e1-9b7f440a95ba": {
            config: {
                host: "vgc.poly.edu",
                index: "nfs",
                info: "nfs/abstracts",
                name: "NSF - Abstracts",
                path: "projects/es-gateway",
                port: "80",
                type: "abstracts",
                useAdvanced: true
            },
            id: "3af0fb70-a1a9-4169-b2e1-9b7f440a95ba",
            type: "Elasticsearch",
            hiddenFacets: [
                "ProgramElementCode",
                "PIEmailAddress",
                "OrganizationZip",
                "OrganizationStreet",
                "OrganizationPhone",
                "AwardedAmountToDate",
                "AwardNumber",
                "ARRAAmount"
            ]
        },
        "020475d4-7038-4392-a949-c818899e08a5": {
            config: {
                host: "vgc.poly.edu",
                index: "whs6",
                info: "whs/document",
                name: "World Humanitarian Summit",
                path: "projects/es-gateway",
                port: "80",
                type: "document",
                useAdvanced: true
            },
            id: "020475d4-7038-4392-a949-c818899e08a5",
            type: "Elasticsearch",
            hiddenFacets: ["Name", "page", "subtopic", "total"]
        },
        UN: {
            config: {
                host: "nyuvis-web.poly.edu",
                index: "united-nations-topics-2",
                info: "united-nations-topics/segments",
                name: "United Nations",
                path: "es",
                port: "80",
                type: "segment",
                useAdvanced: true
            },
            hide: true,
            id: "UN",
            type: "Elasticsearch",
            hiddenFacets: ["Name", "page", "subtopic", "total"]
        },
        "7985b616-a9dc-4538-b26e-fbc0fdba32e7": {
            config: {
                host: "vgc.poly.edu",
                index: "yelprestaurants",
                info: "yelprestaurants/documents",
                name: "Yelp Reviews",
                path: "projects/r2sense",
                port: "80",
                type: "documents",
                useAdvanced: true
            },
            id: "7985b616-a9dc-4538-b26e-fbc0fdba32e7",
            type: "Elasticsearch",
            hiddenFacets: [
                "author.compliments",
                "author.elite",
                "author.fans",
                "author.friends",
                "author.id",
                "author.user_avg_stars",
                "author.votes",
                "author.yelping_since",
                "document.id",
                "document.votes.cool",
                "document.votes.funny",
                "document.votes.useful",
                "entity.docCount",
                "entity.full_address",
                "entity.id",
                "entity.latitude",
                "entity.longitude",
                "entity.neighborhoods"
            ],
            snippetsFields: ["document.text", "document.stars"]
        }
    }
};
