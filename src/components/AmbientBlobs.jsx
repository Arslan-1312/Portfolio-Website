export default function AmbientBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-30 select-none" style={{ contain: 'strict' }}>
      {/* Blob 1 */}
      <div
        className="absolute top-[10%] left-[-10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-gradient-to-br from-primary-blue/30 to-primary-purple/30 blur-[80px] md:blur-[140px] animate-blob"
        style={{ willChange: 'transform', contain: 'layout style paint' }}
      />
      
      {/* Blob 2 */}
      <div
        className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] md:w-[550px] md:h-[550px] rounded-full bg-gradient-to-br from-primary-purple/20 to-primary-cyan/20 blur-[80px] md:blur-[140px] animate-blob-reverse"
        style={{ willChange: 'transform', contain: 'layout style paint' }}
      />
      
      {/* Blob 3 */}
      <div
        className="absolute bottom-[-10%] left-[15%] w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-br from-primary-cyan/25 to-primary-blue/25 blur-[80px] md:blur-[140px] animate-blob"
        style={{ willChange: 'transform', contain: 'layout style paint' }}
      />
    </div>
  )
}
