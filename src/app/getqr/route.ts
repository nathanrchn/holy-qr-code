export const dynamic = "force-dynamic"

function get_random_string(length: number = 10) {
    const random = crypto.getRandomValues(new Uint8Array(length))
    return Array.from(random, (dec) => dec.toString(16)).join('')
}

function get_random_email() {
    return `${get_random_string()}@icloud.com`
}

async function register(email: string, password: string) {
    await fetch("https://holycow-api.5loyalty.com/me/register", {
        method: "POST",
        headers: {
            "Host": "holycow-api.5loyalty.com",
            "Content-Type": "application/json",
            "Origin": "capacitor://holycow-app.5loyalty.com"
        },
        body: JSON.stringify({
            "email": email,
            "password": password,
            "accepted_terms_and_conditions": true,
            "is_subscribed": false,
            "guest": false,
            "sysLocale": "en",
            "locale": "en"
          }),
    })
}

async function auth(email: string, password: string): Promise<[string, string]> {
    const res = await fetch("https://holycow-api.5loyalty.com/api-token-auth", {
        method: "POST",
        headers: {
            "Host": "holycow-api.5loyalty.com",
            "Content-Type": "application/json",
            "Origin": "capacitor://holycow-app.5loyalty.com"
        },
        body: JSON.stringify({
            "username": email,
            "password": password
        })
    })

    const data = await res.json()

    return [data.token, data.profile.qr_code]
}

async function add_code(token: string) {
    await fetch("https://holycow-api.5loyalty.com/voucher/code", {
        method: "PUT",
        headers: {
            "Authorization": `JWT ${token}`,
            "Host": "holycow-api.5loyalty.com",
            "Content-Type": "application/json",
            "Origin": "capacitor://holycow-app.5loyalty.com"
        },
        body: JSON.stringify({
            "code": "FSR2023",
        })
    })
}

async function vouchers(token: string) {
    await fetch("https://holycow-api.5loyalty.com/me/vouchers", {
        method: "GET",
        headers: {
            "Authorization": `JWT ${token}`,
            "Host": "holycow-api.5loyalty.com",
            "Content-Type": "application/json",
            "Origin": "capacitor://holycow-app.5loyalty.com"
        }
    })
}

export async function GET(request: Request) {
    // const email = get_random_email()
    // const password = get_random_string(10)
    // await register(email, password)
    // const [token, qr_code] = await auth(email, password)
    // await add_code(token)
    // await vouchers(token)

    const qr_code = "Super"
    
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    await sleep(5000);

    return new Response(JSON.stringify({ qr_code }), { status: 200 })
}