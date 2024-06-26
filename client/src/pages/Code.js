import { useNavigate } from 'react-router-dom'
import { useEarlyAccess } from '../hooks/useEarlyAccess'
import { useState } from 'react'

import { HOST } from '../util/apiRoutes'
import { fetchWithAuth } from '../util/fetchUtils'

function Code() {
    const [code, setCode] = useState()

    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const { setAccess } = useEarlyAccess()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // authentication
        try {
            await fetchWithAuth({
                url: `${HOST}/api/earlyAccess/check`,
                method: 'POST',
                data: { code },
            })

            setAccess(true)
            navigate('/')
        } catch (error) {
            console.error('Error:', error.message)
            setErrorMessage(error.message)
            setAccess(false)
        }
    }

    return (
        <section
            className="flex h-full w-full flex-col items-center justify-center pb-40 pt-40"
            style={{
                backgroundImage: 'url("hero.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100dvh',
            }}
        >
            <div className="mt-16 flex w-full flex-col items-center justify-center gap-4 text-center">
                {/* Input field for code */}
                <div className="flex w-full max-w-xs flex-row justify-center gap-3 sm:max-w-sm md:max-w-md">
                    <form className="flex flex-row" onSubmit={handleSubmit}>
                        <input
                            id="code"
                            name="code"
                            type="text"
                            required
                            placeholder="Secret code"
                            className="w-full rounded-l-lg border bg-gray-50 px-4 py-2 text-black placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded-r-lg bg-pipeline-blue-200 px-4 py-2 font-bold text-white hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {errorMessage && <p className="text-red-300">{errorMessage}</p>}
            </div>
        </section>
    )
}

export default Code
