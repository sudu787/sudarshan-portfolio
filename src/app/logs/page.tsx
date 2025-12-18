import { Redis } from "@upstash/redis";

// 1. Force dynamic so logs update on refresh
export const dynamic = 'force-dynamic';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function LogsPage() {
  // 2. Fetch data
  const logs = await redis.lrange("visitors", 0, -1);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8">
      <h1 className="text-3xl font-bold mb-8 border-b border-green-800 pb-4">
        root@sudarshan:~/logs
      </h1>

      <div className="space-y-4">
        {logs.map((log: any, index) => {
          // Parse JSON safely
          let data;
          try {
             data = typeof log === 'string' ? JSON.parse(log) : log;
          } catch (e) {
             data = { ip: "Error", city: "Error", device: "Error", time: "Unknown" };
          }
          
          return (
            <div key={index} className="border border-green-900 bg-green-900/10 p-4 rounded text-sm hover:border-green-500 transition-colors">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-white">[{data.time}]</span>
                <span className="text-yellow-500">{data.ip}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-400">
                <p>📍 {data.city}, {data.country}</p>
                <p>💻 {data.device ? data.device.substring(0, 50) : "Unknown"}...</p>
              </div>
            </div>
          );
        })}
        
        {logs.length === 0 && (
          <p className="text-gray-500">No logs captured yet...</p>
        )}
      </div>
    </div>
  );
}