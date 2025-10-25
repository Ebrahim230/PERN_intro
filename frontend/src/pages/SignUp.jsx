import React, { useContext } from 'react'
import { MallContext } from '../context/MallContext'

const SignUp = () => {
  const { handleSubmit, loading, formData, setFormData, isLogin, setIsLogin } = useContext(MallContext)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-md max-w-md md:max-w-sm lg:max-w-xl mt-10 mb-10 md:p-10 rounded-2xl shadow-2xl flex flex-col gap-3 transition-all duration-300 items-center"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 tracking-wide">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        <div className='flex flex-col gap-2'>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 w-auto placeholder-gray-400 transition-colors"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 w-auto placeholder-gray-400 transition-colors"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 w-auto placeholder-gray-400 transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-2 py-3 rounded-xl font-semibold text-lg cursor-pointer hover:bg-indigo-700 active:scale-95 transition-all duration-200 w-25 shadow-lg"
        >
          {loading ? (isLogin ? 'Logging in...' : 'Registering...') : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-sm text-gray-600 text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({ name: '', email: '', password: '' })
            }}
            className="text-indigo-600 cursor-pointer hover:underline font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  )
}

export default SignUp;