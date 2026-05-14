import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function TemplateCard({ template, onCheckout }) {
  const { name, categoryLabel, badge, gradient, ornament, previewNames, previewSub, previewId } = template;
  const navigate = useNavigate();

  function handlePreview() {
    if (previewId) navigate(`/preview/${previewId}`);
  }

  return (
    <div className="group relative bg-white border border-border rounded-lg overflow-hidden cursor-pointer transition-all duration-[350ms] ease-smooth hover:-translate-y-1.5 hover:shadow-lg hover:border-[rgba(142,74,151,0.2)]">

      {/* ── THUMBNAIL ── */}
      <div className="h-[200px] relative overflow-hidden">
        <div
          className="w-full h-full flex items-center justify-center font-display relative"
          style={{ background: gradient }}
        >
          <div className="text-center text-white px-5">
            <div className="text-xl opacity-40 mb-1.5 tracking-[4px]">{ornament}</div>
            <div className="text-[22px] font-light mb-1">{previewNames}</div>
            <div className="text-[11px] opacity-50 tracking-[2px]">{previewSub}</div>
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[rgba(142,74,151,0.12)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={handlePreview}
              className="px-[18px] py-2 text-[12.5px] font-medium rounded-[36px] border-none cursor-pointer bg-white text-charcoal transition-all duration-200 hover:bg-gray-100"
            >
              Preview
            </button>
            <button
              onClick={() => onCheckout(template)}
              className="flex items-center gap-1.5 px-[18px] py-2 text-[12.5px] font-semibold rounded-[36px] border-none cursor-pointer text-white transition-all duration-200 hover:scale-105 hover:shadow-[0_4px_16px_rgba(142,74,151,0.5)]"
              style={{ background: 'linear-gradient(135deg, #8E4A97, #C97DB0)' }}
            >
              <ShoppingBag size={13} strokeWidth={2.5} />
              Beli
            </button>
          </div>
        </div>

        {badge === 'new' && (
          <span className="absolute top-2.5 left-2.5 bg-purple text-white text-[10px] font-medium px-2.5 py-0.5 rounded-full">
            Baru
          </span>
        )}
      </div>

      {/* ── INFO ── */}
      <div className="px-5 py-[1.1rem]">
        <div className="text-[15px] font-medium text-charcoal mb-1">{name}</div>
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] text-purple bg-[rgba(142,74,151,0.08)] px-2.5 py-0.5 rounded-full">
            {categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
