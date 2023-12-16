require("dotenv").config()
const admin = require("firebase-admin")

const serviceAccount = {
    "type": "service_account",
    "project_id": "edu-track-ca154",
    "private_key_id": "a9d09123ee5e2c73444d92fb21d416aaee282b77",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDCBYuB5l2C0aiv\nqPNUBnbVYnl+i9pxY+mm6XYY3b5Ga2k7pyNfsHj8To05jyhiYoo4v1ymivKbV5hy\n+ZjhO2HiCCPxxr7wJRsNG25lH7RB+BUMsjOaxk1Ex9LJlFgWZiSwNXQZpinO65cb\nPiC+pcvocbhbwNidxMhJPe8PYTB5PNsXOr9kDV5YYQ4CGnUsvmcLYKoMW14apqbP\ngbMv+rnztxI2E7nq00lloJXFvt1r2BSHh/AKu/JAabPFAyk2Kqc53UNVIIMXp1l2\nnQT1OKsTliL69IPgomCImutKIoaVul14tWW5rFQqIvAdRM0zwMCjxRHaceVzs594\nCne1yIzhAgMBAAECggEADvH+5k1wsBJG2Gse/T63OiYo/iy3MatU1PjgUjeIf+On\nukLcaHNPSn4hhkjG/1cgVxE0iZaj6//iHB8qXdUla9QdMrNQw25USFzv0sXPrJI3\nyt/SNk6mppDu5XyyEV2iX1lqvUwNpeUDYYOWYaEjVR8naJfxB6wgEnY9GzXtFjWN\nlqv+GMjrVL94141CSYdv8vVou2cmQukoy9LXvTYKPiREfPSmg2krpo1BtmLg/5se\n/FUOsmBp/ks+ZlBmmzPdbiLn2f7i25Juzr3m8O3CBFFbgmsqTIDohUcDyDRd/QAO\nJQqphm4pei2DoSsaxwb0nCAE7MUj5WU4XDBkG5v7sQKBgQD2thVSO3gHmsWK+5Mq\npwW9/LRDXaoAEVjood9q2FSh1RxlR/zVfn9nXMkb9062b7Nrf4maW5jXgEaPaHm5\nK1ZOf86dHDlOLvVroB7jFc3R0gcmzTjbtfe0q9nMKZMgWsrX/zMinJVmMxR5qqU/\nLtrYZ1TvBjfpxuAYb5gZvBCLqQKBgQDJU51x4srBsY+dmL9cITOSR+UZPn0nAyI5\nABN3LwC0LB45mku1gAG6hQlpkl3gf3cMOT54MjFzE/MvcFY5VTxy5LaUBaxgiPBI\nrVfS5kQSCRX/jLFJyR1ANPa4P+EL3t5FvTejWFXg+oSXGJzYMH9Wg9UCeT+Qxneg\neA+RVSh6eQKBgQCIdD1mti21Rw1ryamkNa0fX930RKH6V53tTVrdJbnpqI2EF0To\ncIbXDKLPLQIENdPu6SOalH788p4UQ5zPpgCeemI0059+dsqXNIDg6PZlztzVwTxp\niUPwUfysx3Hwu0bmIOiPhDu9wxLYGGI9iBTTDJQVgEL8slrQKSjfUv1zwQKBgQCx\njkvSMAlP0FBv1lIWZ7W68itMGz93U50wFjAUseB2Bl7VwI260d00abZGZG7k2qXc\novPEP8g6zMJx+SoiQFkinzGi1GoVbVA1WKOW/bvVCCxdh/CnuXZRtSROlQ/eTz1K\n1jkml3aOB4M+WtehFwyG+Ze4KcT04wSIArsAGtGrSQKBgQCXwEp4OvYoggsVyWm7\nAh+pztlARTj0bprfnwlsHSJK/EzXAqGqOzyDmIuxoDaXNEUXu3y61g6YPPFwcKsJ\nio+rLXBeYm0gzEZl0qiZnctU8CIJ1um3ervnjiE1tPQyQoLyheVjGvflucxFjA3y\nSP4RwrZFNPaj/uz+LTLNM7pt9g==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-pz2as@edu-track-ca154.iam.gserviceaccount.com",
    "client_id": "118240162202495813356",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-pz2as%40edu-track-ca154.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

const firebase = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

module.exports = firebase
